# Lê um arquivo do SketchUp (SKP) pelo leitor do próprio SketchUp instalado no PC (SketchUpAPI.dll, assinado pela
# Trimble) e grava o modelo em JSON: cada face com seus pontos já no lugar do modelo, em milímetros (x leste, y norte,
# z para cima), a cor dela, e o grupo ou componente de que ela é; cada grupo e componente com o nome, a definição, a
# camada (etiqueta) e se ele recorta abertura na parede (porta, janela). Chamado por `skp-reader.mjs`, escondido.
#   SKP_ARQUIVO: o .skp; SKP_SAIDA: onde gravar o JSON (ou {"erro": ...}).

$ErrorActionPreference = 'Stop'
$arquivo = $env:SKP_ARQUIVO
$saida = $env:SKP_SAIDA

function Escrever-Erro([string]$codigo, [string]$detalhe) {
	$texto = '{"erro":"' + $codigo + '","detalhe":"' + ($detalhe -replace '["\\]', ' ' -replace '[\r\n]+', ' ') + '"}'
	[IO.File]::WriteAllText($saida, $texto, (New-Object Text.UTF8Encoding $false))
}

# O SketchUp mais novo instalado: o leitor dele abre os arquivos dele e os mais antigos.
$leitor = @()
foreach ($pasta in @("$env:ProgramFiles\SketchUp", "$env:ProgramW6432\SketchUp")) {
	if ($pasta -and (Test-Path $pasta)) {
		$leitor += Get-ChildItem -Path $pasta -Directory -ErrorAction SilentlyContinue |
			ForEach-Object { Join-Path $_.FullName 'SketchUpAPI.dll' } |
			Where-Object { Test-Path $_ }
	}
}
$leitor = $leitor | Sort-Object -Descending | Select-Object -First 1
if (-not $leitor) { Escrever-Erro 'sem-sketchup' ''; exit 0 }

$codigo = @'
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

public static class SkpLeitor {
	[DllImport("kernel32", CharSet = CharSet.Unicode, SetLastError = true)] static extern bool SetDllDirectory(string path);
	[DllImport("kernel32", CharSet = CharSet.Unicode, SetLastError = true)] static extern IntPtr LoadLibrary(string path);

	const string API = "SketchUpAPI.dll";
	[DllImport(API)] static extern void SUInitialize();
	[DllImport(API)] static extern void SUTerminate();
	[DllImport(API)] static extern void SUGetAPIVersion(out UIntPtr major, out UIntPtr minor);
	[DllImport(API)] static extern int SUModelCreateFromFile(out IntPtr model, byte[] path);
	[DllImport(API)] static extern int SUModelRelease(ref IntPtr model);
	[DllImport(API)] static extern int SUModelGetEntities(IntPtr model, out IntPtr entities);
	[DllImport(API)] static extern int SUEntitiesGetNumFaces(IntPtr entities, out UIntPtr count);
	[DllImport(API)] static extern int SUEntitiesGetFaces(IntPtr entities, UIntPtr len, [Out] IntPtr[] faces, out UIntPtr count);
	[DllImport(API)] static extern int SUEntitiesGetNumGroups(IntPtr entities, out UIntPtr count);
	[DllImport(API)] static extern int SUEntitiesGetGroups(IntPtr entities, UIntPtr len, [Out] IntPtr[] groups, out UIntPtr count);
	[DllImport(API)] static extern int SUEntitiesGetNumInstances(IntPtr entities, out UIntPtr count);
	[DllImport(API)] static extern int SUEntitiesGetInstances(IntPtr entities, UIntPtr len, [Out] IntPtr[] instances, out UIntPtr count);
	[DllImport(API)] static extern int SUGroupGetEntities(IntPtr group, out IntPtr entities);
	[DllImport(API)] static extern int SUGroupGetTransform(IntPtr group, [Out] double[] transform);
	[DllImport(API)] static extern int SUGroupGetName(IntPtr group, ref IntPtr name);
	[DllImport(API)] static extern IntPtr SUGroupToDrawingElement(IntPtr group);
	[DllImport(API)] static extern int SUComponentInstanceGetDefinition(IntPtr instance, out IntPtr definition);
	[DllImport(API)] static extern int SUComponentInstanceGetTransform(IntPtr instance, [Out] double[] transform);
	[DllImport(API)] static extern int SUComponentInstanceGetName(IntPtr instance, ref IntPtr name);
	[DllImport(API)] static extern IntPtr SUComponentInstanceToDrawingElement(IntPtr instance);
	[DllImport(API)] static extern int SUComponentDefinitionGetEntities(IntPtr definition, out IntPtr entities);
	[DllImport(API)] static extern int SUComponentDefinitionGetName(IntPtr definition, ref IntPtr name);
	[DllImport(API)] static extern int SUComponentDefinitionGetBehavior(IntPtr definition, [Out] byte[] behavior);
	[DllImport(API)] static extern IntPtr SUFaceToDrawingElement(IntPtr face);
	[DllImport(API)] static extern int SUDrawingElementGetLayer(IntPtr element, out IntPtr layer);
	[DllImport(API)] static extern int SUDrawingElementGetHidden(IntPtr element, [MarshalAs(UnmanagedType.I1)] out bool hidden);
	[DllImport(API)] static extern int SUDrawingElementGetMaterial(IntPtr element, out IntPtr material);
	[DllImport(API)] static extern int SULayerGetName(IntPtr layer, ref IntPtr name);
	[DllImport(API)] static extern int SULayerGetVisibility(IntPtr layer, [MarshalAs(UnmanagedType.I1)] out bool visible);
	[DllImport(API)] static extern int SUFaceGetOuterLoop(IntPtr face, out IntPtr loop);
	[DllImport(API)] static extern int SUFaceGetNumInnerLoops(IntPtr face, out UIntPtr count);
	[DllImport(API)] static extern int SUFaceGetInnerLoops(IntPtr face, UIntPtr len, [Out] IntPtr[] loops, out UIntPtr count);
	[DllImport(API)] static extern int SUFaceGetFrontMaterial(IntPtr face, out IntPtr material);
	[DllImport(API)] static extern int SUFaceGetBackMaterial(IntPtr face, out IntPtr material);
	[DllImport(API)] static extern int SULoopGetNumVertices(IntPtr loop, out UIntPtr count);
	[DllImport(API)] static extern int SULoopGetVertices(IntPtr loop, UIntPtr len, [Out] IntPtr[] vertices, out UIntPtr count);
	[DllImport(API)] static extern int SUVertexGetPosition(IntPtr vertex, [Out] double[] position);
	[DllImport(API)] static extern int SUMaterialGetColor(IntPtr material, [Out] byte[] color);
	[DllImport(API)] static extern int SUStringCreate(out IntPtr text);
	[DllImport(API)] static extern int SUStringRelease(ref IntPtr text);
	[DllImport(API)] static extern int SUStringGetUTF8Length(IntPtr text, out UIntPtr length);
	[DllImport(API)] static extern int SUStringGetUTF8(IntPtr text, UIntPtr length, [Out] byte[] chars, out UIntPtr copied);

	/** Polegadas, a unidade de dentro do SketchUp, em milímetros. */
	const double MM = 25.4;
	/** Mais faces que isto não são lidas: o arquivo sai cortado e diz isso. */
	const int MOST_FACES = 400000;

	static StreamWriter output;
	static int faces;
	static bool cut;
	static readonly StringBuilder objects = new StringBuilder();
	static int objectCount;
	static readonly Dictionary<IntPtr, string> layerNames = new Dictionary<IntPtr, string>();
	static readonly Dictionary<IntPtr, bool> layerShown = new Dictionary<IntPtr, bool>();

	// Cada referência pedida ao SketchUp vai zerada: ele não escreve por cima de uma já preenchida (devolve "já tem"), e
	// a variável reaproveitada guardava a da primeira face, que saía repetida em todas.
	public static string Ler(string folder, string file, string target) {
		SetDllDirectory(folder);
		if (LoadLibrary(Path.Combine(folder, API)) == IntPtr.Zero) return "sem-leitor";
		SUInitialize();
		IntPtr model = IntPtr.Zero;
		try {
			byte[] path = Encoding.UTF8.GetBytes(file + "\0");
			int result = SUModelCreateFromFile(out model, path);
			if (result != 0) return result == 13 ? "versao-nova" : "nao-abriu-" + result;
			IntPtr entities = IntPtr.Zero;
			SUModelGetEntities(model, out entities);
			UIntPtr major, minor;
			SUGetAPIVersion(out major, out minor);
			using (output = new StreamWriter(target, false, new UTF8Encoding(false))) {
				output.Write("{\"api\":\"" + major + "." + minor + "\",\"faces\":[");
				Walk(entities, Identity(), -1, null, 0);
				output.Write("],\"objetos\":[");
				output.Write(objects.ToString());
				output.Write("],\"cortado\":" + (cut ? "true" : "false") + "}");
			}
			return "ok";
		} finally {
			if (model != IntPtr.Zero) SUModelRelease(ref model);
			SUTerminate();
		}
	}

	static int N(UIntPtr value) {
		return (int)value.ToUInt64();
	}

	static UIntPtr U(int value) {
		return new UIntPtr((uint)value);
	}

	static double[] Identity() {
		return new double[] { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 };
	}

	/** A depois B, em matrizes de coluna (a forma do SketchUp). */
	static double[] Times(double[] a, double[] b) {
		double[] c = new double[16];
		for (int column = 0; column < 4; column++)
			for (int row = 0; row < 4; row++) {
				double sum = 0;
				for (int k = 0; k < 4; k++) sum += a[k * 4 + row] * b[column * 4 + k];
				c[column * 4 + row] = sum;
			}
		return c;
	}

	static string Text(IntPtr text) {
		UIntPtr length;
		SUStringGetUTF8Length(text, out length);
		byte[] chars = new byte[N(length) + 1];
		UIntPtr copied;
		SUStringGetUTF8(text, U(chars.Length), chars, out copied);
		return Encoding.UTF8.GetString(chars, 0, Math.Min(N(copied), N(length)));
	}

	delegate int Named(IntPtr owner, ref IntPtr name);

	static string NameOf(Named get, IntPtr owner) {
		IntPtr text = IntPtr.Zero;
		if (SUStringCreate(out text) != 0) return "";
		try {
			return get(owner, ref text) == 0 ? Text(text) : "";
		} finally {
			SUStringRelease(ref text);
		}
	}

	static string Quoted(string text) {
		StringBuilder made = new StringBuilder("\"");
		foreach (char c in text ?? "") {
			if (c == '"' || c == '\\') made.Append('\\').Append(c);
			else if (c < ' ') made.Append(' ');
			else made.Append(c);
		}
		return made.Append('"').ToString();
	}

	/** A etiqueta (camada) de um elemento, e se ela e ele estão à mostra. */
	static string LayerOf(IntPtr element, out bool shown) {
		bool hidden;
		shown = !(SUDrawingElementGetHidden(element, out hidden) == 0 && hidden);
		IntPtr layer = IntPtr.Zero;
		if (SUDrawingElementGetLayer(element, out layer) != 0) return "";
		if (!layerNames.ContainsKey(layer)) {
			layerNames[layer] = NameOf(SULayerGetName, layer);
			bool visible;
			layerShown[layer] = !(SULayerGetVisibility(layer, out visible) == 0 && !visible);
		}
		if (!layerShown[layer]) shown = false;
		return layerNames[layer];
	}

	static string ColourOf(IntPtr material) {
		byte[] colour = new byte[4];
		if (SUMaterialGetColor(material, colour) != 0) return null;
		return "#" + colour[0].ToString("x2") + colour[1].ToString("x2") + colour[2].ToString("x2");
	}

	static string Num(double value) {
		return Math.Round(value, 1).ToString(CultureInfo.InvariantCulture);
	}

	static void WritePoints(IntPtr loop, double[] at, StringBuilder into) {
		UIntPtr count;
		SULoopGetNumVertices(loop, out count);
		IntPtr[] vertices = new IntPtr[N(count)];
		UIntPtr got;
		SULoopGetVertices(loop, count, vertices, out got);
		double[] p = new double[3];
		into.Append('[');
		for (int index = 0; index < N(got); index++) {
			SUVertexGetPosition(vertices[index], p);
			double w = at[3] * p[0] + at[7] * p[1] + at[11] * p[2] + at[15];
			if (Math.Abs(w) < 1e-12) w = 1;
			double x = (at[0] * p[0] + at[4] * p[1] + at[8] * p[2] + at[12]) / w;
			double y = (at[1] * p[0] + at[5] * p[1] + at[9] * p[2] + at[13]) / w;
			double z = (at[2] * p[0] + at[6] * p[1] + at[10] * p[2] + at[14]) / w;
			if (index > 0) into.Append(',');
			into.Append(Num(x * MM)).Append(',').Append(Num(y * MM)).Append(',').Append(Num(z * MM));
		}
		into.Append(']');
	}

	static void Walk(IntPtr entities, double[] at, int owner, string paint, int depth) {
		if (depth > 40) return;
		UIntPtr count;
		UIntPtr got;
		SUEntitiesGetNumFaces(entities, out count);
		IntPtr[] list = new IntPtr[N(count)];
		SUEntitiesGetFaces(entities, count, list, out got);
		for (int index = 0; index < N(got); index++) {
			if (faces >= MOST_FACES) { cut = true; break; }
			IntPtr face = list[index];
			bool shown;
			LayerOf(SUFaceToDrawingElement(face), out shown);
			if (!shown) continue;
			IntPtr material = IntPtr.Zero;
			string colour = null;
			if (SUFaceGetFrontMaterial(face, out material) == 0) colour = ColourOf(material);
			material = IntPtr.Zero;
			if (colour == null && SUFaceGetBackMaterial(face, out material) == 0) colour = ColourOf(material);
			if (colour == null) colour = paint;
			StringBuilder line = new StringBuilder();
			if (faces > 0) line.Append(',');
			line.Append("{\"o\":").Append(owner);
			if (colour != null) line.Append(",\"c\":\"").Append(colour).Append('"');
			line.Append(",\"p\":");
			IntPtr outer = IntPtr.Zero;
			SUFaceGetOuterLoop(face, out outer);
			WritePoints(outer, at, line);
			UIntPtr holes;
			SUFaceGetNumInnerLoops(face, out holes);
			if (N(holes) > 0) {
				IntPtr[] loops = new IntPtr[N(holes)];
				UIntPtr gotLoops;
				SUFaceGetInnerLoops(face, holes, loops, out gotLoops);
				line.Append(",\"h\":[");
				for (int hole = 0; hole < N(gotLoops); hole++) {
					if (hole > 0) line.Append(',');
					WritePoints(loops[hole], at, line);
				}
				line.Append(']');
			}
			line.Append('}');
			output.Write(line.ToString());
			faces++;
		}

		SUEntitiesGetNumGroups(entities, out count);
		list = new IntPtr[N(count)];
		SUEntitiesGetGroups(entities, count, list, out got);
		for (int index = 0; index < N(got); index++) {
			IntPtr group = list[index];
			IntPtr element = SUGroupToDrawingElement(group);
			bool shown;
			string layer = LayerOf(element, out shown);
			if (!shown) continue;
			double[] own = new double[16];
			SUGroupGetTransform(group, own);
			IntPtr inner = IntPtr.Zero;
			if (SUGroupGetEntities(group, out inner) != 0) continue;
			int me = AddObject("g", NameOf(SUGroupGetName, group), "", layer, false, false, owner);
			Walk(inner, Times(at, own), me, PaintOf(element, paint), depth + 1);
		}

		SUEntitiesGetNumInstances(entities, out count);
		list = new IntPtr[N(count)];
		SUEntitiesGetInstances(entities, count, list, out got);
		for (int index = 0; index < N(got); index++) {
			IntPtr instance = list[index];
			IntPtr element = SUComponentInstanceToDrawingElement(instance);
			bool shown;
			string layer = LayerOf(element, out shown);
			if (!shown) continue;
			IntPtr definition = IntPtr.Zero;
			if (SUComponentInstanceGetDefinition(instance, out definition) != 0) continue;
			byte[] behaviour = new byte[32];
			bool cuts = false, faces2d = false;
			if (SUComponentDefinitionGetBehavior(definition, behaviour) == 0) {
				cuts = behaviour[4] != 0;
				faces2d = behaviour[5] != 0;
			}
			double[] own = new double[16];
			SUComponentInstanceGetTransform(instance, own);
			IntPtr inner = IntPtr.Zero;
			if (SUComponentDefinitionGetEntities(definition, out inner) != 0) continue;
			int me = AddObject("c", NameOf(SUComponentInstanceGetName, instance), NameOf(SUComponentDefinitionGetName, definition), layer, cuts, faces2d, owner);
			Walk(inner, Times(at, own), me, PaintOf(element, paint), depth + 1);
		}
	}

	static string PaintOf(IntPtr element, string paint) {
		IntPtr material = IntPtr.Zero;
		if (SUDrawingElementGetMaterial(element, out material) == 0) {
			string colour = ColourOf(material);
			if (colour != null) return colour;
		}
		return paint;
	}

	static int AddObject(string kind, string name, string definition, string layer, bool cuts, bool billboard, int parent) {
		if (objectCount > 0) objects.Append(',');
		objects.Append("{\"t\":\"").Append(kind).Append("\",\"nome\":").Append(Quoted(name))
			.Append(",\"def\":").Append(Quoted(definition)).Append(",\"camada\":").Append(Quoted(layer))
			.Append(",\"pai\":").Append(parent);
		if (cuts) objects.Append(",\"abre\":true");
		if (billboard) objects.Append(",\"plano\":true");
		objects.Append('}');
		return objectCount++;
	}
}
'@

try {
	Add-Type -TypeDefinition $codigo -Language CSharp
	$feito = [SkpLeitor]::Ler((Split-Path $leitor), $arquivo, $saida)
	if ($feito -ne 'ok') { Escrever-Erro $feito '' }
} catch {
	Escrever-Erro 'falhou' $_.Exception.Message
}

# Asks Windows' leave and, given it, has this program's uninstaller take the install for every user away (see
# `takeOldForEveryone` in main.cjs and `customUnInit` in instalador.nsh). A file of its own beside the program, signed
# with it, as `instalador.ps1`; it calls no method of .NET, and so goes whole in Windows' constrained mode too.

try {
	Start-Process -FilePath $env:PRAIAMOB_DESINSTALADOR -ArgumentList '--tirar-antigo', ('_?=' + $env:PRAIAMOB_PASTA) -Verb RunAs -WindowStyle Hidden -Wait
} catch {}
if (-not (Test-Path -LiteralPath $env:PRAIAMOB_ANTIGO)) { Remove-Item -LiteralPath $env:PRAIAMOB_MARCA -ErrorAction SilentlyContinue }

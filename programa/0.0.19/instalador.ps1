# The install of a program fetched (see `followReleases` in main.cjs), driven from outside the program, which is gone
# by then: it waits for the program to be closed, all of it, runs the installer quietly, writes down each step and how
# the installer ended (read at the next start, see `reportLastInstall`), and opens the program again when asked (the
# file `reabrir-depois`, see `installProgram`). Until 29/10/2026 the installer was left to the updater as the program
# closed, with nothing to tell whether it ran: a program of 0.0.15 fetched the 0.16.0, was closed, and nothing changed.
# Meanwhile a screen of Windows itself, in the colours of the program's opening, says it is installing, with a bar
# going: without it the program seemed to have closed for good, or fallen, and was opened again and again. A copy tried
# out out of sight passes `PRAIAMOB_SEM_TELA`: no screen, and the program opened again unseen, with the switches it was
# given (`PRAIAMOB_ARGUMENTOS`), in its own folder of work and never the user's.
#
# A file of its own beside the program, signed with it (see `scripts/assinatura.mjs`): where Windows runs only signed
# scripts whole (Smart App Control), one not signed runs in its constrained mode, which calls no method of .NET but
# those of a few types. So the steps call none (31/10/2026: the folder of the program was read with one, and nothing
# else went), and only the screen, which needs them, is lost there; the install goes on without it.

$installer = $env:PRAIAMOB_INSTALADOR
$program = $env:PRAIAMOB_PROGRAMA
$folder = (Split-Path -Parent $program) + '\'
$name = (Split-Path -Leaf $program) -replace '\.exe$', ''
$log = $env:PRAIAMOB_REGISTRO
$lock = $env:PRAIAMOB_TRAVA
$reopen = $env:PRAIAMOB_REABRIR
$quiet = [bool]$env:PRAIAMOB_SEM_TELA
$arguments = $env:PRAIAMOB_ARGUMENTOS
$asked = @('--updated', '/S')
if ($env:PRAIAMOB_MODO) { $asked += $env:PRAIAMOB_MODO }

function Say([string]$line) {
	try { Add-Content -LiteralPath $log -Value ((Get-Date).ToString('s') + ' ' + $line) } catch {}
}

# Whether the program is open: any of its processes, run from the folder it is installed in.
function Open {
	foreach ($each in @(Get-Process -Name $name -ErrorAction SilentlyContinue)) {
		$at = $null
		try { $at = $each.Path } catch {}
		if ($at -and $at.ToLowerInvariant().StartsWith($folder.ToLowerInvariant())) { return $true }
	}
	return $false
}

$script:state = 'fechando'
$script:since = Get-Date
$script:running = $null
$script:done = $false

# One step, every half second: the program closes, the installer runs, the program opens again. Says whether there is more.
function Step {
	if ($script:done) { return $false }
	$waited = ((Get-Date) - $script:since).TotalSeconds
	if ($script:state -eq 'fechando') {
		if (Open) {
			if ($waited -lt 90) { return $true }
			Say 'o programa nao fechou em 90 s: nada instalado'
			$script:state = 'fim'
			return $true
		}
		Say ('programa fechado em ' + [int]$waited + ' s; instalador ' + ($asked -join ' '))
		try {
			$script:running = Start-Process -FilePath $installer -ArgumentList $asked -WindowStyle Hidden -PassThru
			# Asked once now, so that the code it ends with is kept for when it has ended.
			$null = $script:running.Handle
			$script:state = 'instalando'
			$script:since = Get-Date
		} catch {
			Say ('o instalador nao abriu: ' + $_.Exception.Message)
			$script:state = 'fim'
		}
		return $true
	}
	if ($script:state -eq 'instalando') {
		if ($script:running.HasExited) {
			Say ('instalador terminou com o codigo ' + $script:running.ExitCode + ' em ' + [int]$waited + ' s')
			$script:state = 'fim'
		} elseif ($waited -gt 600) {
			Say 'o instalador nao terminou em 10 min'
			$script:state = 'fim'
		}
		return $true
	}
	$script:done = $true
	# Lock and wish go first: the program opened finds no install running.
	$wanted = Test-Path -LiteralPath $reopen
	Remove-Item -LiteralPath $reopen -ErrorAction SilentlyContinue
	Remove-Item -LiteralPath $lock -ErrorAction SilentlyContinue
	if ($wanted -and -not (Open)) {
		try {
			$how = @{ FilePath = $program }
			if ($arguments) { $how.ArgumentList = $arguments }
			if ($quiet) { $how.WindowStyle = 'Hidden' }
			Start-Process @how
			Say 'programa aberto de novo'
		} catch {
			Say ('o programa nao abriu de novo: ' + $_.Exception.Message)
		}
	}
	return $false
}

Say ('instalando o programa ' + $env:PRAIAMOB_VERSAO + ' (' + $ExecutionContext.SessionState.LanguageMode + ')')
if (-not $quiet) {
	try {
		Add-Type -AssemblyName PresentationFramework, PresentationCore, WindowsBase
		$window = New-Object System.Windows.Window
		$window.WindowStyle = 'None'
		$window.ResizeMode = 'NoResize'
		$window.Width = 380
		$window.Height = 168
		$window.WindowStartupLocation = 'CenterScreen'
		$window.Topmost = $true
		$window.ShowActivated = $false
		$window.Title = 'PraiaMob'
		$window.Background = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromRgb(0x16, 0x19, 0x1e))
		$panel = New-Object System.Windows.Controls.StackPanel
		$panel.Margin = '28,26,28,20'
		$mark = New-Object System.Windows.Controls.TextBlock
		$mark.FontFamily = 'Segoe UI'
		$mark.FontSize = 24
		$mark.FontWeight = 'Bold'
		$praia = New-Object System.Windows.Documents.Run 'Praia'
		$praia.Foreground = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromRgb(0xe3, 0xe7, 0xee))
		$mob = New-Object System.Windows.Documents.Run 'Mob'
		$mob.Foreground = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromRgb(0x5b, 0x8c, 0xf0))
		$mark.Inlines.Add($praia)
		$mark.Inlines.Add($mob)
		$said = New-Object System.Windows.Controls.TextBlock
		$said.Text = 'Instalando a versão nova'
		$said.FontFamily = 'Segoe UI'
		$said.FontSize = 13
		$said.Margin = '0,10,0,0'
		$said.Foreground = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromRgb(0xe3, 0xe7, 0xee))
		$more = New-Object System.Windows.Controls.TextBlock
		$more.Text = $env:PRAIAMOB_DEPOIS
		$more.FontFamily = 'Segoe UI'
		$more.FontSize = 11.5
		$more.Margin = '0,3,0,12'
		$more.Foreground = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromRgb(0x8d, 0x96, 0xa3))
		$bar = New-Object System.Windows.Controls.ProgressBar
		$bar.IsIndeterminate = $true
		$bar.Height = 4
		$bar.BorderThickness = '0'
		$bar.Background = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromRgb(0x2a, 0x2f, 0x37))
		$bar.Foreground = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromRgb(0x5b, 0x8c, 0xf0))
		$panel.Children.Add($mark) | Out-Null
		$panel.Children.Add($said) | Out-Null
		$panel.Children.Add($more) | Out-Null
		$panel.Children.Add($bar) | Out-Null
		$window.Content = $panel
		$timer = New-Object System.Windows.Threading.DispatcherTimer
		$timer.Interval = [TimeSpan]::FromMilliseconds(500)
		$timer.Add_Tick({ if (-not (Step)) { $timer.Stop(); $window.Close() } })
		$timer.Start()
		$window.ShowDialog() | Out-Null
	} catch {}
}
# Without a screen, or with it closed by hand: the steps go on all the same.
while (Step) { Start-Sleep -Milliseconds 500 }

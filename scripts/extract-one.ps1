
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead('c:\Users\valir\OneDrive\Рабочий стол\valesco\valesco\Статья для Valesco Oil.docx')
$e = $z.GetEntry('word/document.xml')
$r = New-Object System.IO.StreamReader($e.Open(), [System.Text.Encoding]::UTF8)
$x = $r.ReadToEnd()
$r.Close()
$z.Dispose()
$x

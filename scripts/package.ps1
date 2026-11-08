$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$archiveTarget = Join-Path $projectRoot 'phd-compass.zip'
$selectedFiles = @('index.html','styles.css','app.js','core.js','catalogue.js','data.js','data-broad.js','data-more-a.js','data-more-b.js','data-more-c.js','data-directory.js','enrichment-original.js','ui-extended.js','literature.js','assets/compass.svg','.nojekyll','.gitignore','package.json','README.md','CATALOGUE.md','DIRECTORY_SOURCES.md','directory-sources.json','directory-provenance.json','VALIDATION.md','scripts/serve.cjs','scripts/check.cjs','scripts/catalogue.cjs','scripts/package.ps1','scripts/collect-directories.cjs','scripts/collect-stanford.cjs','scripts/collect-us.cjs','scripts/collect-uk-au.cjs','scripts/build-directory.cjs','tests/core.test.cjs','tests/extended.test.cjs','tests/directory.test.cjs','.github/workflows/pages.yml')
$archiveStream = [IO.File]::Open($archiveTarget,[IO.FileMode]::Create)
$archive = [IO.Compression.ZipArchive]::new($archiveStream,[IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($relativeFile in $selectedFiles) {
    $sourcePath = [IO.Path]::GetFullPath((Join-Path $projectRoot $relativeFile))
    if (-not $sourcePath.StartsWith($projectRoot + [IO.Path]::DirectorySeparatorChar)) { throw 'Packaging path outside project.' }
    [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive,$sourcePath,$relativeFile,[IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $archive.Dispose(); $archiveStream.Dispose() }
Write-Output ('Packaged ' + $selectedFiles.Count + ' public/source files: ' + $archiveTarget)

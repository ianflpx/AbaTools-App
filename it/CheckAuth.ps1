$headers = @{
    "apikey" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeGZqd2hwaWxsaHVkZ3F0dXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMzE3ODMsImV4cCI6MjA4NTkwNzc4M30.on32sO1OAx9NWZZr4oOA2b2Z_Gk5BesQ7xhtMAMDpXc"
    "Authorization" = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeGZqd2hwaWxsaHVkZ3F0dXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMzE3ODMsImV4cCI6MjA4NTkwNzc4M30.on32sO1OAx9NWZZr4oOA2b2Z_Gk5BesQ7xhtMAMDpXc"
}
$url = "https://tjxfjwhpillhudgqtusf.supabase.co/rest/v1/user_access?email=eq.savu.florin@gmail.com&select=*"

try {
    $Risposta = Invoke-RestMethod -Uri $url -Headers $headers -Method Get
    Write-Host "Success! Data received:"
    $Risposta | Format-List
} catch {
    Write-Host "Errore: $($_.Exception.Message)"
    if ($_.Exception.Risposta) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Risposta.GetRispostaStream()
        $reader.BaseStream.Position = 0
        $reader.ReadToEnd()
    }
}

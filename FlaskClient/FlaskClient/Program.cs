using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class ResponseDto { public string? message { get; set; } }

class Program
{
    static async Task Main()
    {
        await CallFlaskAndReadAsync();
    }

    public static async Task CallFlaskAndReadAsync()
    {
        using var client = new HttpClient();

        HttpResponseMessage resp;
        try
        {
            resp = await client.GetAsync("http://127.0.0.1:5000/");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Request failed: " + ex.Message);
            return;
        }

        string body = await resp.Content.ReadAsStringAsync();

        if (!resp.IsSuccessStatusCode)
        {
            Console.WriteLine($"Status: {(int)resp.StatusCode} {resp.ReasonPhrase}");
            Console.WriteLine("Body: " + body);
            return;
        }

        ResponseDto? dto = null;
        try
        {
            dto = JsonConvert.DeserializeObject<ResponseDto>(body);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Deserialization failed: " + ex.Message);
        }

        Console.WriteLine("message (DTO): " + (dto?.message ?? "<null>"));

        try
        {
            JObject obj = JObject.Parse(body);
            Console.WriteLine("message (JObject): " + (string?)obj["message"]);
        }
        catch
        {
            // ignore parse error
        }
    }
}

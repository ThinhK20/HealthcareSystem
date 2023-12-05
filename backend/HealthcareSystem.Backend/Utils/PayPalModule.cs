using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using HealthcareSystem.Backend.Models.PayPal;

namespace HealthcareSystem.Backend.Utils
{
    public class PayPalModule
    {
        public async Task<string> GetToken(string userNamePayPal, string passwordPayPal, string linkPayPal)
        {
            string baseUrl = $"{linkPayPal}/v1/oauth2/token";
            string userName = userNamePayPal;
            string password = passwordPayPal;
            using (HttpClient client = new HttpClient())
            {
                var byteArray = new UTF8Encoding().GetBytes($"{userName}:{password}");
                //client.DefaultRequestHeaders.Add("Content-Type", "application/x-www-form-urlencoded");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
                var body = new[]
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials"),
                };
                using (HttpResponseMessage res = await client.PostAsync(baseUrl, new FormUrlEncodedContent(body)))
                {
                    using (HttpContent content = res.Content)
                    {

                        var data = await content.ReadAsStringAsync();
                        if (data != null)
                        {
                            var obj = JsonSerializer.Deserialize<Token>(data);
                            return obj.access_token;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }
        private async Task<CreateOrderReturn> CreateOrder(string linkPayPal, string _tokenPayPal, float price,string PackageName, string returnPath)
        {
            string baseUrl = $"{linkPayPal}/v2/checkout/orders/";
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_tokenPayPal}");
                DataCreatePayPal dataCreate = CreateDataOrderPayPal(price,PackageName,returnPath);
                var body = JsonContent.Create(dataCreate);
                using (HttpResponseMessage res = await client.PostAsync(baseUrl, body))
                {
                    using (HttpContent content = res.Content)
                    {

                        var data = await content.ReadAsStringAsync();
                        if (data != null)
                        {
                            var obj = JsonSerializer.Deserialize<CreateOrderReturn>(data);
                            return obj;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }
        private DataCreatePayPal CreateDataOrderPayPal(float price, string PackageName,string returnPath)
        {
            var data = new ItemPayPal()
            {
                name = $"Payment to Insurance company for {PackageName}",
                description = "Payment for Insurance company",
                quantity = "1",
                amount = new UnitAmount { currency_code = "USD", value = $"{price}" }
            };
            var listData = new List<ItemPayPal>();
            listData.Add(data);
            var paypalData = new DataCreatePayPal()
            {
                intent = "CAPTURE",
                purchase_units = new List<PurchaseUnit>()
                    {
                        new PurchaseUnit()
                        {
                            items = new List<ItemPayPal>(listData),

                            amount = new AmountPayPal()
                            {
                                currency_code = "USD",
                                value = $"{price}",
                                breakdown = new BreakdownPayPal()
                                {
                                    item_total = new ItemTotalPayPal()
                                    {
                                        currency_code = "USD",
                                        value = $"{price}",
                                    }
                                }
                            }
                        }
                    },
                application_context = new ApplicationContext()
                {
                    cancel_url = returnPath,
                    return_url = $"{returnPath}/completePayment"
                }
            };
            return paypalData;
        }
        private async Task<bool> ConfirmPaymentPalpal(string token,string linkPayPal, string _tokenPaypal)
        {
            string baseUrl = $"{linkPayPal}/v2/checkout/orders/{token}/capture";
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_tokenPaypal}");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var body = JsonContent.Create(new { a = 1 });
                using (HttpResponseMessage res = await client.PostAsync(baseUrl, body))
                {
                    if (res.StatusCode == HttpStatusCode.Created)
                    {
                        return true;
                    }
                    else return false;
                }
            }
        }
    }
}

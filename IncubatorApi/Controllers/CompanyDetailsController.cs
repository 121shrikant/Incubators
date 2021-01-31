using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IncubatorsApi.Controllers
{
    public class CompanyDetailsController : ApiController
    {
        // GET api/CompanyDetails
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/CompanyDetails/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/CompanyDetails
        public void Post([FromBody]string value)
        {
        }

        // PUT api/CompanyDetails/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/CompanyDetails/5
        public void Delete(int id)
        {
        }
    }
}

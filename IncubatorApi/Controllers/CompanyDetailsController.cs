using IncubatorApi.Controllers;
using IncubatorBusinessLayer.Interface;
using IncubatorBusinessLayer.Models;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace IncubatorsApi.Controllers
{
    [BasicAuthentication]
    public class CompanyDetailsController : ApiController
    {
        private ICompanyDetailsService _companyDetailsService;
        public CompanyDetailsController(ICompanyDetailsService _companyDetailsService)
        {
            this._companyDetailsService = _companyDetailsService;
        }

        // GET api/CompanyDetails/GetAllCompanyDetails
        [HttpGet]
        [Route("api/CompanyDetails/GetAllCompanyDetails")]
        public HttpResponseMessage GetAllCompanyDetails()
        {
            //string userName = Thread.CurrentPrincipal.Identity.Name;
            //if (userName != "")
            //{
                return Request.CreateResponse(HttpStatusCode.OK, _companyDetailsService.GetAllCompanyDetails());
            //}
            //else
            //{
            //    return Request.CreateResponse(HttpStatusCode.Unauthorized);
            //}
            //return _companyDetailsService.GetAllCompanyDetails();
        }

        // GET api/CompanyDetails/GetCompanyById/5
        [HttpGet]
        [Route("api/CompanyDetails/GetCompanyById/{id}")]
        public CompanyDetailsVM GetCompanyById(int id)
        {
            return _companyDetailsService.GetCompanyById(id);
        }

        // POST api/CompanyDetails
        [HttpPost]
        [Route("api/CompanyDetails/AddCompany")]
        public bool AddCompany([FromBody]CompanyDetailsVM model)
        {
            return  _companyDetailsService.AddCompany(model);
        }

        // PUT api/CompanyDetails/UpdateCompany
        [HttpPut]
        [Route("api/CompanyDetails/UpdateCompany")]
        public bool UpdateCompany([FromBody]CompanyDetailsVM model)
        {
            return _companyDetailsService.UpdateCompany(model);
        }

        // PUT api/CompanyDetails/ActivateCompany/5
        //[HttpPut]
        [HttpGet]
        [Route("api/CompanyDetails/ActivateCompany/{id}")]
        public bool ActivateCompany(int id)
        {
            return _companyDetailsService.ActivateCompany(id);
        }

        // PUT api/CompanyDetails/DeactivateCompany/5
        //[HttpPut]
        [HttpGet]
        [Route("api/CompanyDetails/DeactivateCompany/{id}")]
        public bool DeactivateCompany(int id)
        {
            return _companyDetailsService.DeactivateCompany(id);
        }
    }
}

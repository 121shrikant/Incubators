using IncubatorApi.Controllers;
using IncubatorBusinessLayer.Interface;
using IncubatorBusinessLayer.Models;
using IncubatorBusinessLayer.Service;
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
        /// <summary>
        /// Returns company details active for non admin and all record for admin
        /// </summary>
        /// <returns>list of company of type CompanyDetailsVM</returns>
        [HttpGet]
        [Route("api/CompanyDetails/GetAllCompanyDetails")]
        public HttpResponseMessage GetAllCompanyDetails()
        {
            string userName = Thread.CurrentPrincipal.Identity.Name;
            if (userName != "")
            {
                return Request.CreateResponse(HttpStatusCode.OK, _companyDetailsService.GetAllCompanyDetails());
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }

        // GET api/CompanyDetails/GetCompanyById/5
        /// <summary>
        /// Returns single company record
        /// </summary>
        /// <param name="id">of type int record ID</param>
        /// <returns>single company record for edit</returns>
        [HttpGet]
        [Route("api/CompanyDetails/GetCompanyById/{id}")]
        public HttpResponseMessage GetCompanyById(int id)
        {
            string userName = Thread.CurrentPrincipal.Identity.Name;
            if (userName != "")
            {
                return Request.CreateResponse(HttpStatusCode.OK, _companyDetailsService.GetCompanyById(id));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }

        // POST api/CompanyDetails
        /// <summary>
        /// Insert new Record
        /// </summary>
        /// <param name="model">of type CompanyDetailsVM data to insert</param>
        /// <returns>Return true or false based on insert operation</returns>
        [HttpPost]
        [Route("api/CompanyDetails/AddCompany")]
        public HttpResponseMessage AddCompany([FromBody]CompanyDetailsVM model)
        {
            string userName = Thread.CurrentPrincipal.Identity.Name;
            if (userName != "")
            {
                return Request.CreateResponse(HttpStatusCode.OK, _companyDetailsService.AddCompany(model));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }

        // PUT api/CompanyDetails/UpdateCompany
        /// <summary>
        /// Update existing Record
        /// </summary>
        /// <param name="model">of type CompanyDetailsVM data to insert</param>
        /// <returns>Return true or false based on update operation</returns>
        [HttpPut]
        [Route("api/CompanyDetails/UpdateCompany")]
        public HttpResponseMessage UpdateCompany([FromBody]CompanyDetailsVM model)
        {
            string userName = Thread.CurrentPrincipal.Identity.Name;
            if (userName != "")
            {
                return Request.CreateResponse(HttpStatusCode.OK, _companyDetailsService.UpdateCompany(model));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }

        // PUT api/CompanyDetails/ActivateCompany/5
        /// <summary>
        /// Activate company to allow acces to other user
        /// </summary>
        /// <param name="id">of type int activate company based on id</param>
        /// <returns>Return true or false based on operation</returns>
        [HttpPut]
        [Route("api/CompanyDetails/ActivateCompany")]
        public HttpResponseMessage ActivateCompany([FromBody]int id)
        {
            if (AccountService.IsAdmin())
            {
                return Request.CreateResponse(HttpStatusCode.OK, _companyDetailsService.ActivateCompany(id));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }

        // PUT api/CompanyDetails/DeactivateCompany/5
        /// <summary>
        /// DeactivateCompany company to allow acces to other user
        /// </summary>
        /// <param name="id">of type int DeactivateCompany company based on id</param>
        /// <returns>Return true or false based on operation</returns>
        [HttpPut]
        [Route("api/CompanyDetails/DeactivateCompany")]
        public HttpResponseMessage DeactivateCompany([FromBody]int id)
        {
            if (AccountService.IsAdmin())
            {
                return Request.CreateResponse(HttpStatusCode.OK, _companyDetailsService.DeactivateCompany(id));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }
    }
}

using IncubatorBusinessLayer.Interface;
using IncubatorBusinessLayer.Models;
using IncubatorData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IncubatorApi.Controllers
{
    public class AccountController : ApiController
    {
        private IAccountService _accountService;
        public AccountController(IAccountService _accountService)
        {
            this._accountService = _accountService;
        }
        [HttpPost]
        [Route("api/AccountController/Login")]
        public UserDetailsVm Login([FromBody] LoginDetails loginDetails)
        {
            return _accountService.Login(loginDetails);
        }
    }
}

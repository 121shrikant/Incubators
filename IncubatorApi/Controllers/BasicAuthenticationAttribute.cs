using IncubatorBusinessLayer.Interface;
using IncubatorBusinessLayer.Models;
using IncubatorBusinessLayer.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace IncubatorApi.Controllers
{
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {

            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                string authenticationToken = actionContext.Request.Headers.Authorization.Parameter;
                string decodedAuthenticationToken = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));
                string[] usernamePasswordArray = decodedAuthenticationToken.Split(':');
                string uname = usernamePasswordArray[0];
                string pass = usernamePasswordArray[1];
                LoginDetails loginDetails = new LoginDetails()
                {
                    UserName = uname,
                    Password = pass
                };
                if (AccountService.Login(uname, pass))
                {
                    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(uname), null);
                }
                else
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}
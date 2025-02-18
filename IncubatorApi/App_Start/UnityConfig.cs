using IncubatorBusinessLayer.Interface;
using IncubatorBusinessLayer.Service;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace IncubatorApi
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<ICompanyDetailsService, CompanyDetailsService>();
            container.RegisterType<IAccountService, AccountService>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}
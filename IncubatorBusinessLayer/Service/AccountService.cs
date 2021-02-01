using IncubatorBusinessLayer.Interface;
using IncubatorBusinessLayer.Models;
using IncubatorData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IncubatorBusinessLayer.Service
{
    public class AccountService : IAccountService
    {
        public UserDetailsVm Login(LoginDetails loginDetails)
        {
            UserDetail userDetails = new UserDetail();
            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                userDetails = db.UserDetails.Where(x => x.UserName.Equals(loginDetails.UserName, StringComparison.OrdinalIgnoreCase) && x.Password == loginDetails.Password).FirstOrDefault();
            }
            UserDetailsVm userDetailsVm = new UserDetailsVm();
            if (userDetails != null)
                userDetailsVm = new UserDetailsVm()
                {
                    Id = userDetails.Id,
                    UserName = userDetails.UserName,
                    Password = string.Empty,
                    RoleType = userDetails.RoleType
                };
            else
                userDetailsVm = null;
            return userDetailsVm;
        }

        public static bool Login(string UserName, string Password)
        {
            UserDetail userDetails = new UserDetail();
            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                userDetails = db.UserDetails.Where(x => x.UserName.Equals(UserName, StringComparison.OrdinalIgnoreCase) && x.Password == Password).FirstOrDefault();
            }
            if (userDetails != null)
                return true;
            else
                return false;
        }
    }
}
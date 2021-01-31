using IncubatorBusinessLayer.Enums;
using IncubatorBusinessLayer.Interface;
using IncubatorBusinessLayer.Models;
using IncubatorData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IncubatorBusinessLayer.Service
{
    public class CompanyDetailsService : ICompanyDetailsService
    {

        public List<CompanyDetailsVM> GetAllCompanyDetails()
        {
            List<CompanyDetail> dbCompanyList = new List<CompanyDetail>();
            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                dbCompanyList = db.CompanyDetails.ToList();
            }

            List<CompanyDetailsVM> companyDetails = dbCompanyList.Select(x => new CompanyDetailsVM()
            {
                Id = x.Id,
                CompanyStatus = x.CompanyStatus,
                CompanyName = x.CompanyName,
                ManagingPartner = x.ManagingPartner,
                LaunchedYear = x.LaunchedYear,
                Stage = x.Stage,
                NumberOfMembers = x.NumberOfMembers,
                WebSite = x.WebSite,
                Email = x.Email,
                Phone = x.Phone,
                Country = x.Country,
                City = x.City,
                Pincode = x.Pincode,
                CreatedBy = x.CreatedBy
            }).ToList();
            return companyDetails;
        }

        public CompanyDetailsVM GetCompanyById(int id)
        {
            CompanyDetail dbCompanyList = new CompanyDetail();
            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                dbCompanyList = db.CompanyDetails.Where(x => x.Id == id).FirstOrDefault();
            }
            CompanyDetailsVM companyDetails = new CompanyDetailsVM();
            if (dbCompanyList != null)
            {
                companyDetails = new CompanyDetailsVM()
                {
                    Id = dbCompanyList.Id,
                    CompanyStatus = dbCompanyList.CompanyStatus,
                    CompanyName = dbCompanyList.CompanyName,
                    ManagingPartner = dbCompanyList.ManagingPartner,
                    LaunchedYear = dbCompanyList.LaunchedYear,
                    Stage = dbCompanyList.Stage,
                    NumberOfMembers = dbCompanyList.NumberOfMembers,
                    WebSite = dbCompanyList.WebSite,
                    Email = dbCompanyList.Email,
                    Phone = dbCompanyList.Phone,
                    Country = dbCompanyList.Country,
                    City = dbCompanyList.City,
                    Pincode = dbCompanyList.Pincode,
                    CreatedBy = dbCompanyList.CreatedBy
                };
            }
            
            return companyDetails;
        }

        public bool ActivateCompany(int id)
        {
            CompanyDetail dbCompanyList = new CompanyDetail();
            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                dbCompanyList = db.CompanyDetails.Where(x => x.Id == id).FirstOrDefault();
                if (dbCompanyList != null)
                {
                    dbCompanyList.CompanyStatus = (int)CompanyStatusEnum.Activate;
                    db.SaveChanges();
                    return true;
                }
            }
            return false;
        }
        public bool DeactivateCompany(int id)
        {
            CompanyDetail dbCompanyList = new CompanyDetail();
            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                dbCompanyList = db.CompanyDetails.Where(x => x.Id == id).FirstOrDefault();
                if (dbCompanyList != null)
                {
                    dbCompanyList.CompanyStatus = (int)CompanyStatusEnum.Deactivate;
                    db.SaveChanges();
                    return true;
                }
            }
            return false;
        }
    }
}
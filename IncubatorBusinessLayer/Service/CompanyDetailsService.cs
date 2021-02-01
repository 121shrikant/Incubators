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
            bool isAdmin = AccountService.IsAdmin();

            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                dbCompanyList = db.CompanyDetails.Where(x => isAdmin || (!isAdmin && x.CompanyStatus == (int)CompanyStatusEnum.Activate)).ToList();
            }
            // Can use AutoMapper
            List<CompanyDetailsVM> companyDetails = new List<CompanyDetailsVM>();
            if (dbCompanyList.Count > 0) {
                companyDetails = dbCompanyList.Select(x => new CompanyDetailsVM()
                {
                    Id = x.Id,
                    CompanyStatus = (CompanyStatusEnum)x.CompanyStatus,
                    CompanyName = x.CompanyName,
                    ManagingPartner = x.ManagingPartner,
                    LaunchedYear = x.LaunchedYear,
                    Stage = (CompanyStageEnum)x.Stage,
                    NumberOfMembers = x.NumberOfMembers,
                    WebSite = x.WebSite,
                    Email = x.Email,
                    Phone = x.Phone,
                    Country = x.Country,
                    City = x.City,
                    Pincode = x.Pincode,
                    CreatedBy = x.CreatedBy
                }).ToList();
            }
                
            return companyDetails;
        }

        public CompanyDetailsVM GetCompanyById(int id)
        {
            CompanyDetail dbCompanyList = new CompanyDetail();
            bool isAdmin = AccountService.IsAdmin();
            using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
            {
                dbCompanyList = db.CompanyDetails.Where(x => x.Id == id && (isAdmin || (!isAdmin && x.CompanyStatus == (int)CompanyStatusEnum.Activate))).FirstOrDefault();
                
            }
            CompanyDetailsVM companyDetails = new CompanyDetailsVM();
            if (dbCompanyList != null)
            {
                companyDetails = new CompanyDetailsVM()
                {
                    Id = dbCompanyList.Id,
                    CompanyStatus = (CompanyStatusEnum)dbCompanyList.CompanyStatus,
                    CompanyName = dbCompanyList.CompanyName,
                    ManagingPartner = dbCompanyList.ManagingPartner,
                    LaunchedYear = dbCompanyList.LaunchedYear,
                    Stage = (CompanyStageEnum)dbCompanyList.Stage,
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
            else
            {
                return null;
            }
            
            return companyDetails;
        }

        public bool AddCompany(CompanyDetailsVM model)
        {
            try
            {
                CompanyDetail dataModel = new CompanyDetail()
                {
                    CompanyStatus = (int)model.CompanyStatus,
                    CompanyName = model.CompanyName,
                    ManagingPartner = model.ManagingPartner,
                    LaunchedYear = model.LaunchedYear,
                    Stage = (int)model.Stage,
                    NumberOfMembers = model.NumberOfMembers,
                    WebSite = model.WebSite,
                    Email = model.Email,
                    Phone = model.Phone,
                    Country = model.Country,
                    City = model.City,
                    Pincode = model.Pincode,
                    CreatedBy = model.CreatedBy
                };
                using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
                {
                    db.CompanyDetails.Add(dataModel);
                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public bool UpdateCompany(CompanyDetailsVM model)
        {
            try
            {
                CompanyDetail dbCompanyList = new CompanyDetail();
                using (GrowUpIncubatorEntities db = new GrowUpIncubatorEntities())
                {
                    dbCompanyList = db.CompanyDetails.Where(x => x.Id == model.Id).FirstOrDefault();
                    if (dbCompanyList != null)
                    {
                        dbCompanyList.Id = dbCompanyList.Id;
                        dbCompanyList.CompanyStatus = (int)dbCompanyList.CompanyStatus;
                        dbCompanyList.CompanyName = dbCompanyList.CompanyName;
                        dbCompanyList.ManagingPartner = dbCompanyList.ManagingPartner;
                        dbCompanyList.LaunchedYear = dbCompanyList.LaunchedYear;
                        dbCompanyList.Stage = (int)dbCompanyList.Stage;
                        dbCompanyList.NumberOfMembers = dbCompanyList.NumberOfMembers;
                        dbCompanyList.WebSite = dbCompanyList.WebSite;
                        dbCompanyList.Email = dbCompanyList.Email;
                        dbCompanyList.Phone = dbCompanyList.Phone;
                        dbCompanyList.Country = dbCompanyList.Country;
                        dbCompanyList.City = dbCompanyList.City;
                        dbCompanyList.Pincode = dbCompanyList.Pincode;
                        db.SaveChanges();
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {

                return false;
            }
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
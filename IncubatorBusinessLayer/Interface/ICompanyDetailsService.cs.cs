using IncubatorBusinessLayer.Models;
using IncubatorData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IncubatorBusinessLayer.Interface
{
    public interface ICompanyDetailsService
    { 
        List<CompanyDetailsVM> GetAllCompanyDetails();
        CompanyDetailsVM GetCompanyById(int id);
        bool ActivateCompany(int id);
        bool DeactivateCompany(int id);
    }
}

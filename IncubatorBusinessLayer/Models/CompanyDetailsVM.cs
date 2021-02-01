using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IncubatorBusinessLayer.Models
{
    public class CompanyDetailsVM : CompanyDetails
    {
        public string StageString { get; set; }
    }
}
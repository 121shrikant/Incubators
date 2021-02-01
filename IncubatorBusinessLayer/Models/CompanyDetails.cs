using IncubatorBusinessLayer.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IncubatorBusinessLayer.Models
{
    public class CompanyDetails
    {
        public int Id { get; set; }
        public CompanyStatusEnum CompanyStatus { get; set; }
        public string CompanyName { get; set; }
        public string ManagingPartner { get; set; }
        public int LaunchedYear { get; set; }
        public CompanyStageEnum Stage { get; set; }
        public int NumberOfMembers { get; set; }
        public string WebSite { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Pincode { get; set; }
        public int CreatedBy { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IncubatorBusinessLayer.Enums
{
    public enum CompanyStageEnum
    {
        None = 0,
        IdeaStage = 1,
        PrototypeDeveloped = 2,
        PrivateBeta = 3,
        PublicBeta = 4,
        Launched = 5,
        Revenuegreaterthan10Lakhs = 6
    }
}
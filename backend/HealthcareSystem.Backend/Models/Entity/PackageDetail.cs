﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class PackageDetail
    {
        [Key]
        [Column(Order = 0)]
        public int PackageID { get; set; }
        [Key]
        [Column(Order = 1)]
        public int PolicyID { get; set; }
        public double? PayoutPrice { get; set; }
        public double? MaxRefundPerExamination { get; set; }
        
        public double? MaxRefundPerDay { get; set; }

        public double? MaxRefundPeYear { get; set; }
        public virtual PolicyPackage PolicyPackage { get; set; }
        public virtual InsurancePolicy InsurancePolicy { get; set; }
    }
}

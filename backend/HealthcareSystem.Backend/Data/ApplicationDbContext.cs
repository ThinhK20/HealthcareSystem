using HealthcareSystem.Backend.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace HealthcareSystem.Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<CustomerInquiry> CustomerInquiries { get; set; }
        public DbSet<CustomerRequest> CustomerRequests { get; set; }
        public DbSet<HealthRecord> HealthRecords { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
        public DbSet<InsuranceDetail> InsuranceDetails { get; set; }
        public DbSet<PackageDetail> PackageDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PolicyPackage> PolicyPackages { get; set; }
        public DbSet<RefundDetail> RefundDetails { get; set; }
        public DbSet<RefundRequest> RefundRequests { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InsuranceDetail>()
                .HasKey(x => new { x.PackageID, x.InsureID });

            modelBuilder.Entity<PackageDetail>()
                .HasKey(x => new { x.PolicyID, x.PackageID });

            modelBuilder.Entity<HealthRecord>()
                .HasKey(x => new { x.UserID, x.RecordId });

            modelBuilder.Entity<BasicPrice>()
                .HasKey(x => new { x.PackageID, x.IndexId });


            modelBuilder.Entity<User>()
                .HasOne(u => u.Account)
                .WithOne(a => a.User)
                .HasForeignKey<Account>(a => a.UserId);

            modelBuilder.Entity<Account>()
                .HasMany(a => a.CustomerInquiries)
                .WithOne(c => c.Account)
                .HasForeignKey(c => c.AccountId);


            modelBuilder.Entity<Account>()
                .HasMany(a => a.HealthRecords)
                .WithOne(h => h.Account)
                .HasForeignKey(h => h.UserID);

            modelBuilder.Entity<FeeAffect>()
                .HasMany(f => f.HealthRecords)
                .WithOne(h => h.FeeAffects)
                .HasForeignKey(h => h.FeeAffectID);

            modelBuilder.Entity<CustomerRequest>()
               .HasOne(a => a.Payment)
               .WithOne(c => c.CustomerRequest)
               .HasForeignKey<CustomerRequest>(c => c.PaymentId);


            modelBuilder.Entity<Account>()
              .HasOne(a => a.Insurance)
              .WithOne(c => c.Account)
              .HasPrincipalKey<Insurance>(a => a.UserID);


            modelBuilder.Entity<PolicyPackage>()
              .HasMany(a => a.CustomerRequests)
              .WithOne(c => c.PolicyPackage)
              .HasForeignKey(c => c.PackageId);


            modelBuilder.Entity<PolicyPackage>()
             .HasMany(a => a.InsuranceDetails)
             .WithOne(c => c.PolicyPackage)
             .HasForeignKey(c => c.PackageID);


            modelBuilder.Entity<CustomerRequest>()
                .HasOne(c => c.Account)
                .WithMany(a => a.CustomerRequests)
                .HasForeignKey(c => c.AccountId);


            modelBuilder.Entity<CustomerRequest>()
                .HasOne(cr => cr.Staff)
                .WithMany(a => a.ApproverRequests)
                .HasForeignKey(cr => cr.StaffId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<RefundRequest>()
               .HasMany(a => a.RefundDetails)
               .WithOne(c => c.RefundRequest)
               .HasForeignKey(c => c.RefundID);

            modelBuilder.Entity<PackageDetail>() //to PackageID
                .HasOne(pd => pd.PolicyPackage)
                .WithMany(pp => pp.PackageDetails)
                .HasForeignKey(pd => pd.PackageID);

            modelBuilder.Entity<PackageDetail>() //to policyID
                .HasOne(pd => pd.InsurancePolicy)
                .WithMany(ip => ip.PackageDetails)
                .HasForeignKey(pd => pd.PolicyID);

            modelBuilder.Entity<Insurance>()
                .HasMany(rr => rr.RefundRequests)
                .WithOne(pp => pp.Insurance)
                .HasForeignKey(rr => rr.InsureId);

            modelBuilder.Entity<RefundRequest>()
               .HasMany(ip => ip.RefundDetails)
               .WithOne(pp => pp.RefundRequest)
               .HasForeignKey(rd => rd.RefundID);

            modelBuilder.Entity<RefundDetail>()
                .HasOne(rd => rd.InsurancePolicy)
                .WithMany(ip => ip.RefundDetails)
                .HasForeignKey(rd => rd.PolicyId);
        }
    }
}

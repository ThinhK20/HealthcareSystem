﻿// <auto-generated />
using System;
using HealthcareSystem.Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.Account", b =>
                {
                    b.Property<int>("AccountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AccountId"));

                    b.Property<string>("InsuranceUserID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AccountId");

                    b.HasIndex("InsuranceUserID")
                        .IsUnique()
                        .HasFilter("[InsuranceUserID] IS NOT NULL");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.BasicPrice", b =>
                {
                    b.Property<int>("PackageID")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("IndexId")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<int?>("FromAge")
                        .HasColumnType("int");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Price")
                        .HasColumnType("float");

                    b.Property<int?>("ToAge")
                        .HasColumnType("int");

                    b.HasKey("PackageID", "IndexId");

                    b.ToTable("BasicPrice");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.CustomerInquiry", b =>
                {
                    b.Property<int>("InquiryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InquiryID"));

                    b.Property<int?>("AccountId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Answer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DateAnwser")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateQuestion")
                        .HasColumnType("datetime2");

                    b.Property<string>("Question")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Questioner")
                        .HasColumnType("int");

                    b.Property<int?>("Respondent")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("InquiryID");

                    b.HasIndex("AccountId");

                    b.ToTable("CustomerInquiries");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.CustomerRequest", b =>
                {
                    b.Property<int>("RequestID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RequestID"));

                    b.Property<int?>("AccountId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateAccept")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateRequest")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PackageId")
                        .HasColumnType("int");

                    b.Property<int?>("PaymentId")
                        .HasColumnType("int");

                    b.Property<string>("Periodic")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Price")
                        .HasColumnType("real");

                    b.Property<int?>("StaffId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RequestID");

                    b.HasIndex("AccountId");

                    b.HasIndex("PackageId");

                    b.HasIndex("PaymentId")
                        .IsUnique()
                        .HasFilter("[PaymentId] IS NOT NULL");

                    b.HasIndex("StaffId");

                    b.ToTable("CustomerRequests");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.FeeAffect", b =>
                {
                    b.Property<int>("FeeAffectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FeeAffectId"));

                    b.Property<string>("FeeAffectName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("MaxPercentIncrease")
                        .HasColumnType("float");

                    b.Property<double?>("PercentIncreaseInFirst")
                        .HasColumnType("float");

                    b.Property<double?>("PercentIncreaseInNext")
                        .HasColumnType("float");

                    b.HasKey("FeeAffectId");

                    b.ToTable("FeeAffect");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.HealthRecord", b =>
                {
                    b.Property<int>("UserID")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("IndexRecord")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FeeAffectID")
                        .HasColumnType("int");

                    b.Property<int?>("Phase")
                        .HasColumnType("int");

                    b.Property<DateTime?>("RecordDate")
                        .HasColumnType("datetime2");

                    b.HasKey("UserID", "IndexRecord");

                    b.HasIndex("FeeAffectID");

                    b.ToTable("HealthRecords");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.InsuranceDetail", b =>
                {
                    b.Property<int>("PackageID")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("InsureID")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<DateTime>("DateEnd")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateStart")
                        .HasColumnType("datetime2");

                    b.HasKey("PackageID", "InsureID");

                    b.HasIndex("InsureID");

                    b.ToTable("InsuranceDetails");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.InsurancePolicy", b =>
                {
                    b.Property<int>("PolicyID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PolicyID"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PolicyID");

                    b.ToTable("InsurancePolicy");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.PackageDetail", b =>
                {
                    b.Property<int>("PolicyID")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<int>("PackageID")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<double?>("MaxRefundPeYear")
                        .HasColumnType("float");

                    b.Property<double?>("MaxRefundPerDay")
                        .HasColumnType("float");

                    b.Property<double?>("MaxRefundPerExamination")
                        .HasColumnType("float");

                    b.Property<double?>("PayoutPrice")
                        .HasColumnType("float");

                    b.HasKey("PolicyID", "PackageID");

                    b.HasIndex("PackageID");

                    b.ToTable("PackageDetails");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.Payment", b =>
                {
                    b.Property<int>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentId"));

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<double?>("Price")
                        .HasColumnType("float");

                    b.Property<int?>("RequestId")
                        .HasColumnType("int");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("PaymentId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.PolicyPackage", b =>
                {
                    b.Property<int>("Packageid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Packageid"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Packageid");

                    b.ToTable("PolicyPackages");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.RefundDetail", b =>
                {
                    b.Property<int>("RefundDetailID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RefundDetailID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PolicyId")
                        .HasColumnType("int");

                    b.Property<double>("RefundFee")
                        .HasColumnType("float");

                    b.Property<int>("RefundID")
                        .HasColumnType("int");

                    b.HasKey("RefundDetailID");

                    b.HasIndex("PolicyId");

                    b.HasIndex("RefundID");

                    b.ToTable("RefundDetails");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.RefundRequest", b =>
                {
                    b.Property<int>("RefundID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RefundID"));

                    b.Property<DateTime?>("DateRefund")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateSend")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoptitalDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoptitalName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("InsureId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("TotalRefundFee")
                        .HasColumnType("float");

                    b.HasKey("RefundID");

                    b.HasIndex("InsureId");

                    b.ToTable("RefundRequests");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Birthdate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CCCD")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Insurance", b =>
                {
                    b.Property<int>("InsuranceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InsuranceID"));

                    b.Property<string>("CardOpenDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RegisterPlace")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("InsuranceID");

                    b.ToTable("Insurances");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.Account", b =>
                {
                    b.HasOne("Insurance", "Insurance")
                        .WithOne("Account")
                        .HasForeignKey("HealthcareSystem.Backend.Models.Entity.Account", "InsuranceUserID")
                        .HasPrincipalKey("Insurance", "UserID");

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.User", "User")
                        .WithOne("Account")
                        .HasForeignKey("HealthcareSystem.Backend.Models.Entity.Account", "UserId");

                    b.Navigation("Insurance");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.BasicPrice", b =>
                {
                    b.HasOne("HealthcareSystem.Backend.Models.Entity.PolicyPackage", "PolicyPackage")
                        .WithMany("BasicPrices")
                        .HasForeignKey("PackageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PolicyPackage");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.CustomerInquiry", b =>
                {
                    b.HasOne("HealthcareSystem.Backend.Models.Entity.Account", "Account")
                        .WithMany("CustomerInquiries")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.CustomerRequest", b =>
                {
                    b.HasOne("HealthcareSystem.Backend.Models.Entity.Account", "Account")
                        .WithMany("CustomerRequests")
                        .HasForeignKey("AccountId");

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.PolicyPackage", "PolicyPackage")
                        .WithMany("CustomerRequests")
                        .HasForeignKey("PackageId");

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.Payment", "Payment")
                        .WithOne("CustomerRequest")
                        .HasForeignKey("HealthcareSystem.Backend.Models.Entity.CustomerRequest", "PaymentId");

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.Account", "Staff")
                        .WithMany("ApproverRequests")
                        .HasForeignKey("StaffId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Account");

                    b.Navigation("Payment");

                    b.Navigation("PolicyPackage");

                    b.Navigation("Staff");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.HealthRecord", b =>
                {
                    b.HasOne("HealthcareSystem.Backend.Models.Entity.FeeAffect", "FeeAffects")
                        .WithMany("HealthRecords")
                        .HasForeignKey("FeeAffectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.Account", "Account")
                        .WithMany("HealthRecords")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("FeeAffects");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.InsuranceDetail", b =>
                {
                    b.HasOne("Insurance", "Insurance")
                        .WithMany("InsuranceDetails")
                        .HasForeignKey("InsureID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.PolicyPackage", "PolicyPackage")
                        .WithMany("InsuranceDetails")
                        .HasForeignKey("PackageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Insurance");

                    b.Navigation("PolicyPackage");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.PackageDetail", b =>
                {
                    b.HasOne("HealthcareSystem.Backend.Models.Entity.PolicyPackage", "PolicyPackage")
                        .WithMany("PackageDetails")
                        .HasForeignKey("PackageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.InsurancePolicy", "InsurancePolicy")
                        .WithMany("PackageDetails")
                        .HasForeignKey("PolicyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("InsurancePolicy");

                    b.Navigation("PolicyPackage");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.RefundDetail", b =>
                {
                    b.HasOne("HealthcareSystem.Backend.Models.Entity.InsurancePolicy", "InsurancePolicy")
                        .WithMany("RefundDetails")
                        .HasForeignKey("PolicyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthcareSystem.Backend.Models.Entity.RefundRequest", "RefundRequest")
                        .WithMany("RefundDetails")
                        .HasForeignKey("RefundID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("InsurancePolicy");

                    b.Navigation("RefundRequest");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.RefundRequest", b =>
                {
                    b.HasOne("Insurance", "Insurance")
                        .WithMany("RefundRequests")
                        .HasForeignKey("InsureId");

                    b.Navigation("Insurance");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.Account", b =>
                {
                    b.Navigation("ApproverRequests");

                    b.Navigation("CustomerInquiries");

                    b.Navigation("CustomerRequests");

                    b.Navigation("HealthRecords");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.FeeAffect", b =>
                {
                    b.Navigation("HealthRecords");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.InsurancePolicy", b =>
                {
                    b.Navigation("PackageDetails");

                    b.Navigation("RefundDetails");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.Payment", b =>
                {
                    b.Navigation("CustomerRequest");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.PolicyPackage", b =>
                {
                    b.Navigation("BasicPrices");

                    b.Navigation("CustomerRequests");

                    b.Navigation("InsuranceDetails");

                    b.Navigation("PackageDetails");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.RefundRequest", b =>
                {
                    b.Navigation("RefundDetails");
                });

            modelBuilder.Entity("HealthcareSystem.Backend.Models.Entity.User", b =>
                {
                    b.Navigation("Account")
                        .IsRequired();
                });

            modelBuilder.Entity("Insurance", b =>
                {
                    b.Navigation("Account")
                        .IsRequired();

                    b.Navigation("InsuranceDetails");

                    b.Navigation("RefundRequests");
                });
#pragma warning restore 612, 618
        }
    }
}

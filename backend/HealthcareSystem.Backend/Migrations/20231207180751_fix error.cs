using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class fixerror : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeeAffect",
                columns: table => new
                {
                    FeeAffectId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FeeAffectName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PercentIncreaseInFirst = table.Column<double>(type: "float", nullable: true),
                    PercentIncreaseInNext = table.Column<double>(type: "float", nullable: true),
                    MaxPercentIncrease = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeeAffect", x => x.FeeAffectId);
                });

            migrationBuilder.CreateTable(
                name: "InsurancePolicy",
                columns: table => new
                {
                    PolicyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsurancePolicy", x => x.PolicyID);
                });

            migrationBuilder.CreateTable(
                name: "Insurances",
                columns: table => new
                {
                    InsuranceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegisterPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CardOpenDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insurances", x => x.InsuranceID);
                    table.UniqueConstraint("AK_Insurances_UserID", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "PolicyPackages",
                columns: table => new
                {
                    Packageid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyPackages", x => x.Packageid);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CCCD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Birthdate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "RefundRequests",
                columns: table => new
                {
                    RefundID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InsureId = table.Column<int>(type: "int", nullable: true),
                    DateSend = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateRefund = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoptitalName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalRefundFee = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefundRequests", x => x.RefundID);
                    table.ForeignKey(
                        name: "FK_RefundRequests_Insurances_InsureId",
                        column: x => x.InsureId,
                        principalTable: "Insurances",
                        principalColumn: "InsuranceID");
                });

            migrationBuilder.CreateTable(
                name: "BasicPrice",
                columns: table => new
                {
                    PackageID = table.Column<int>(type: "int", nullable: false),
                    IndexId = table.Column<int>(type: "int", nullable: false),
                    FromAge = table.Column<int>(type: "int", nullable: true),
                    ToAge = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasicPrice", x => new { x.PackageID, x.IndexId });
                    table.ForeignKey(
                        name: "FK_BasicPrice_PolicyPackages_PackageID",
                        column: x => x.PackageID,
                        principalTable: "PolicyPackages",
                        principalColumn: "Packageid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InsuranceDetails",
                columns: table => new
                {
                    PackageID = table.Column<int>(type: "int", nullable: false),
                    InsureID = table.Column<int>(type: "int", nullable: false),
                    DateStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateEnd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceDetails", x => new { x.PackageID, x.InsureID });
                    table.ForeignKey(
                        name: "FK_InsuranceDetails_Insurances_InsureID",
                        column: x => x.InsureID,
                        principalTable: "Insurances",
                        principalColumn: "InsuranceID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InsuranceDetails_PolicyPackages_PackageID",
                        column: x => x.PackageID,
                        principalTable: "PolicyPackages",
                        principalColumn: "Packageid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PackageDetails",
                columns: table => new
                {
                    PackageID = table.Column<int>(type: "int", nullable: false),
                    PolicyID = table.Column<int>(type: "int", nullable: false),
                    PayoutPrice = table.Column<double>(type: "float", nullable: true),
                    MaxRefundPerExamination = table.Column<double>(type: "float", nullable: true),
                    MaxRefundPerDay = table.Column<double>(type: "float", nullable: true),
                    MaxRefundPeYear = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageDetails", x => new { x.PolicyID, x.PackageID });
                    table.ForeignKey(
                        name: "FK_PackageDetails_InsurancePolicy_PolicyID",
                        column: x => x.PolicyID,
                        principalTable: "InsurancePolicy",
                        principalColumn: "PolicyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PackageDetails_PolicyPackages_PackageID",
                        column: x => x.PackageID,
                        principalTable: "PolicyPackages",
                        principalColumn: "Packageid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    AccountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InsuranceUserID = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_Accounts_Insurances_InsuranceUserID",
                        column: x => x.InsuranceUserID,
                        principalTable: "Insurances",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK_Accounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "RefundDetails",
                columns: table => new
                {
                    RefundDetailID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RefundID = table.Column<int>(type: "int", nullable: false),
                    PolicyId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefundFee = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefundDetails", x => x.RefundDetailID);
                    table.ForeignKey(
                        name: "FK_RefundDetails_InsurancePolicy_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "InsurancePolicy",
                        principalColumn: "PolicyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RefundDetails_RefundRequests_RefundID",
                        column: x => x.RefundID,
                        principalTable: "RefundRequests",
                        principalColumn: "RefundID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomerInquiries",
                columns: table => new
                {
                    InquiryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    Questioner = table.Column<int>(type: "int", nullable: true),
                    Respondent = table.Column<int>(type: "int", nullable: true),
                    DateQuestion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateAnwser = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerInquiries", x => x.InquiryID);
                    table.ForeignKey(
                        name: "FK_CustomerInquiries_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomerRequests",
                columns: table => new
                {
                    RequestID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: true),
                    StaffId = table.Column<int>(type: "int", nullable: true),
                    PackageId = table.Column<int>(type: "int", nullable: true),
                    DateRequest = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateAccept = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Periodic = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<float>(type: "real", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerRequests", x => x.RequestID);
                    table.ForeignKey(
                        name: "FK_CustomerRequests_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId");
                    table.ForeignKey(
                        name: "FK_CustomerRequests_Accounts_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId");
                    table.ForeignKey(
                        name: "FK_CustomerRequests_PolicyPackages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "PolicyPackages",
                        principalColumn: "Packageid");
                });

            migrationBuilder.CreateTable(
                name: "EmailVerification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VerifyNumber = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailVerification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmailVerification_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HealthRecords",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false),
                    IndexRecord = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecordDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Phase = table.Column<int>(type: "int", nullable: true),
                    FeeAffectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthRecords", x => new { x.UserID, x.IndexRecord });
                    table.ForeignKey(
                        name: "FK_HealthRecords_Accounts_UserID",
                        column: x => x.UserID,
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HealthRecords_FeeAffect_FeeAffectID",
                        column: x => x.FeeAffectID,
                        principalTable: "FeeAffect",
                        principalColumn: "FeeAffectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestId = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExpirationPaypal = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: true),
                    LinkCheckOut = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaypalEmail = table.Column<bool>(type: "bit", nullable: true),
                    idPayPal = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payments_CustomerRequests_RequestId",
                        column: x => x.RequestId,
                        principalTable: "CustomerRequests",
                        principalColumn: "RequestID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_InsuranceUserID",
                table: "Accounts",
                column: "InsuranceUserID",
                unique: true,
                filter: "[InsuranceUserID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerInquiries_AccountId",
                table: "CustomerInquiries",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequests_AccountId",
                table: "CustomerRequests",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequests_PackageId",
                table: "CustomerRequests",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequests_StaffId",
                table: "CustomerRequests",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailVerification_AccountId",
                table: "EmailVerification",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_FeeAffectID",
                table: "HealthRecords",
                column: "FeeAffectID");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceDetails_InsureID",
                table: "InsuranceDetails",
                column: "InsureID");

            migrationBuilder.CreateIndex(
                name: "IX_PackageDetails_PackageID",
                table: "PackageDetails",
                column: "PackageID");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_RequestId",
                table: "Payments",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_RefundDetails_PolicyId",
                table: "RefundDetails",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_RefundDetails_RefundID",
                table: "RefundDetails",
                column: "RefundID");

            migrationBuilder.CreateIndex(
                name: "IX_RefundRequests_InsureId",
                table: "RefundRequests",
                column: "InsureId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BasicPrice");

            migrationBuilder.DropTable(
                name: "CustomerInquiries");

            migrationBuilder.DropTable(
                name: "EmailVerification");

            migrationBuilder.DropTable(
                name: "HealthRecords");

            migrationBuilder.DropTable(
                name: "InsuranceDetails");

            migrationBuilder.DropTable(
                name: "PackageDetails");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "RefundDetails");

            migrationBuilder.DropTable(
                name: "FeeAffect");

            migrationBuilder.DropTable(
                name: "CustomerRequests");

            migrationBuilder.DropTable(
                name: "InsurancePolicy");

            migrationBuilder.DropTable(
                name: "RefundRequests");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "PolicyPackages");

            migrationBuilder.DropTable(
                name: "Insurances");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

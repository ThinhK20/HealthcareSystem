using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InsurancePolicy",
                columns: table => new
                {
                    PolicyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PayoutPercentage = table.Column<double>(type: "float", nullable: false),
                    MaxRefund = table.Column<double>(type: "float", nullable: false)
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
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
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
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CCCD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Birthdate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    InsureId = table.Column<int>(type: "int", nullable: false),
                    DateSend = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateRefund = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HoptitalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HoptitalDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalRefundFee = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefundRequests", x => x.RefundID);
                    table.ForeignKey(
                        name: "FK_RefundRequests_Insurances_InsureId",
                        column: x => x.InsureId,
                        principalTable: "Insurances",
                        principalColumn: "InsuranceID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InsuranceDetails",
                columns: table => new
                {
                    PackageID = table.Column<int>(type: "int", nullable: false),
                    InsureID = table.Column<int>(type: "int", nullable: false),
                    DateStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InsuranceID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceDetails", x => new { x.PackageID, x.InsureID });
                    table.ForeignKey(
                        name: "FK_InsuranceDetails_Insurances_InsuranceID",
                        column: x => x.InsuranceID,
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
                    DateStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateEnd = table.Column<DateTime>(type: "datetime2", nullable: false)
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
                    UserId = table.Column<int>(type: "int", nullable: false),
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
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
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
                    Questioner = table.Column<int>(type: "int", nullable: false),
                    Respondent = table.Column<int>(type: "int", nullable: false),
                    DateQuestion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateAnwser = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    PackageId = table.Column<int>(type: "int", nullable: false),
                    PaymentId = table.Column<int>(type: "int", nullable: false),
                    DateRequest = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateAccept = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Periodic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerRequests", x => x.RequestID);
                    table.ForeignKey(
                        name: "FK_CustomerRequests_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerRequests_Accounts_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId");
                    table.ForeignKey(
                        name: "FK_CustomerRequests_Payments_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "Payments",
                        principalColumn: "PaymentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerRequests_PolicyPackages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "PolicyPackages",
                        principalColumn: "Packageid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HealthRecords",
                columns: table => new
                {
                    RecordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthRecords", x => x.RecordId);
                    table.ForeignKey(
                        name: "FK_HealthRecords_Accounts_UserID",
                        column: x => x.UserID,
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
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
                unique: true);

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
                name: "IX_CustomerRequests_PaymentId",
                table: "CustomerRequests",
                column: "PaymentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequests_StaffId",
                table: "CustomerRequests",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_UserID",
                table: "HealthRecords",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceDetails_InsuranceID",
                table: "InsuranceDetails",
                column: "InsuranceID");

            migrationBuilder.CreateIndex(
                name: "IX_PackageDetails_PackageID",
                table: "PackageDetails",
                column: "PackageID");

            migrationBuilder.CreateIndex(
                name: "IX_RefundDetails_PolicyId",
                table: "RefundDetails",
                column: "PolicyId",
                unique: true);

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
                name: "CustomerInquiries");

            migrationBuilder.DropTable(
                name: "CustomerRequests");

            migrationBuilder.DropTable(
                name: "HealthRecords");

            migrationBuilder.DropTable(
                name: "InsuranceDetails");

            migrationBuilder.DropTable(
                name: "PackageDetails");

            migrationBuilder.DropTable(
                name: "RefundDetails");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "PolicyPackages");

            migrationBuilder.DropTable(
                name: "InsurancePolicy");

            migrationBuilder.DropTable(
                name: "RefundRequests");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Insurances");
        }
    }
}

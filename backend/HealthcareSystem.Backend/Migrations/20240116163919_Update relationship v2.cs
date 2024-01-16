using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Updaterelationshipv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerInquiries_Accounts_AccountId",
                table: "CustomerInquiries");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerInquiries_Accounts_AccountId",
                table: "CustomerInquiries",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerInquiries_Accounts_AccountId",
                table: "CustomerInquiries");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerInquiries_Accounts_AccountId",
                table: "CustomerInquiries",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "AccountId");
        }
    }
}

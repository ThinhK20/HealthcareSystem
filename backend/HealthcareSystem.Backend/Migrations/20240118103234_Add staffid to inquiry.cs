using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Addstaffidtoinquiry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerInquiries_Accounts_AccountId",
                table: "CustomerInquiries");

            migrationBuilder.DropIndex(
                name: "IX_CustomerInquiries_AccountId",
                table: "CustomerInquiries");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "CustomerInquiries");

            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "CustomerInquiries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerInquiries_StaffId",
                table: "CustomerInquiries",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerInquiries_Accounts_StaffId",
                table: "CustomerInquiries",
                column: "StaffId",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerInquiries_Accounts_StaffId",
                table: "CustomerInquiries");

            migrationBuilder.DropIndex(
                name: "IX_CustomerInquiries_StaffId",
                table: "CustomerInquiries");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "CustomerInquiries");

            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "CustomerInquiries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerInquiries_AccountId",
                table: "CustomerInquiries",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerInquiries_Accounts_AccountId",
                table: "CustomerInquiries",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "AccountId");
        }
    }
}

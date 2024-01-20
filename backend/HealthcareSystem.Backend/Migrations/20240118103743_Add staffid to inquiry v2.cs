using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Addstaffidtoinquiryv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerInquiries_Accounts_StaffId",
                table: "CustomerInquiries");

            migrationBuilder.AlterColumn<int>(
                name: "StaffId",
                table: "CustomerInquiries",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerInquiries_Accounts_StaffId",
                table: "CustomerInquiries",
                column: "StaffId",
                principalTable: "Accounts",
                principalColumn: "AccountId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerInquiries_Accounts_StaffId",
                table: "CustomerInquiries");

            migrationBuilder.AlterColumn<int>(
                name: "StaffId",
                table: "CustomerInquiries",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerInquiries_Accounts_StaffId",
                table: "CustomerInquiries",
                column: "StaffId",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

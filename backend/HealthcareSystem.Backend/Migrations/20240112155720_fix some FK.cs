using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class fixsomeFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HealthRecords_Accounts_UserID",
                table: "HealthRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_HealthRecords_Users_UserID",
                table: "HealthRecords",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HealthRecords_Users_UserID",
                table: "HealthRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_HealthRecords_Accounts_UserID",
                table: "HealthRecords",
                column: "UserID",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

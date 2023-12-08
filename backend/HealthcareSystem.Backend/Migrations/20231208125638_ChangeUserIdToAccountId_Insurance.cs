using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserIdToAccountId_Insurance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Insurances_InsuranceUserID",
                table: "Accounts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Insurances_UserID",
                table: "Insurances");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_InsuranceUserID",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Insurances",
                newName: "AccountId");

            migrationBuilder.RenameColumn(
                name: "InsuranceUserID",
                table: "Accounts",
                newName: "InsuranceAccountId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Insurances_AccountId",
                table: "Insurances",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_InsuranceAccountId",
                table: "Accounts",
                column: "InsuranceAccountId",
                unique: true,
                filter: "[InsuranceAccountId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Insurances_InsuranceAccountId",
                table: "Accounts",
                column: "InsuranceAccountId",
                principalTable: "Insurances",
                principalColumn: "AccountId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Insurances_InsuranceAccountId",
                table: "Accounts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Insurances_AccountId",
                table: "Insurances");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_InsuranceAccountId",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "AccountId",
                table: "Insurances",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "InsuranceAccountId",
                table: "Accounts",
                newName: "InsuranceUserID");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Insurances_UserID",
                table: "Insurances",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_InsuranceUserID",
                table: "Accounts",
                column: "InsuranceUserID",
                unique: true,
                filter: "[InsuranceUserID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Insurances_InsuranceUserID",
                table: "Accounts",
                column: "InsuranceUserID",
                principalTable: "Insurances",
                principalColumn: "UserID");
        }
    }
}

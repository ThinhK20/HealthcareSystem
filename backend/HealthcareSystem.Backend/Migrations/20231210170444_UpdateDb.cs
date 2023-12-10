using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "InsuranceAccountId",
                table: "Accounts");

            migrationBuilder.AlterColumn<string>(
                name: "AccountId",
                table: "Insurances",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "AccountId1",
                table: "Insurances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Insurances_AccountId1",
                table: "Insurances",
                column: "AccountId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Insurances_Accounts_AccountId1",
                table: "Insurances",
                column: "AccountId1",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Insurances_Accounts_AccountId1",
                table: "Insurances");

            migrationBuilder.DropIndex(
                name: "IX_Insurances_AccountId1",
                table: "Insurances");

            migrationBuilder.DropColumn(
                name: "AccountId1",
                table: "Insurances");

            migrationBuilder.AlterColumn<string>(
                name: "AccountId",
                table: "Insurances",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "InsuranceAccountId",
                table: "Accounts",
                type: "nvarchar(450)",
                nullable: true);

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
    }
}

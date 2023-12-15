using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "AccountId",
                table: "Insurances",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Insurances_AccountId",
                table: "Insurances",
                column: "AccountId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Insurances_Accounts_AccountId",
                table: "Insurances",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Insurances_Accounts_AccountId",
                table: "Insurances");

            migrationBuilder.DropIndex(
                name: "IX_Insurances_AccountId",
                table: "Insurances");

            migrationBuilder.AlterColumn<string>(
                name: "AccountId",
                table: "Insurances",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

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
    }
}

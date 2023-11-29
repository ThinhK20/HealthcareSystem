using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddInsuranceDetails_Insurance_Relationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceDetails_Insurances_InsuranceID",
                table: "InsuranceDetails");

            migrationBuilder.DropIndex(
                name: "IX_InsuranceDetails_InsuranceID",
                table: "InsuranceDetails");

            migrationBuilder.DropColumn(
                name: "InsuranceID",
                table: "InsuranceDetails");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceDetails_InsureID",
                table: "InsuranceDetails",
                column: "InsureID");

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceDetails_Insurances_InsureID",
                table: "InsuranceDetails",
                column: "InsureID",
                principalTable: "Insurances",
                principalColumn: "InsuranceID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceDetails_Insurances_InsureID",
                table: "InsuranceDetails");

            migrationBuilder.DropIndex(
                name: "IX_InsuranceDetails_InsureID",
                table: "InsuranceDetails");

            migrationBuilder.AddColumn<int>(
                name: "InsuranceID",
                table: "InsuranceDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceDetails_InsuranceID",
                table: "InsuranceDetails",
                column: "InsuranceID");

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceDetails_Insurances_InsuranceID",
                table: "InsuranceDetails",
                column: "InsuranceID",
                principalTable: "Insurances",
                principalColumn: "InsuranceID");
        }
    }
}

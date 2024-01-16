using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCustomerInquyries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Questioner",
                table: "CustomerInquiries");

            migrationBuilder.DropColumn(
                name: "Respondent",
                table: "CustomerInquiries");

            migrationBuilder.RenameColumn(
                name: "Answer",
                table: "CustomerInquiries",
                newName: "Phone");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "CustomerInquiries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "CustomerInquiries",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "CustomerInquiries");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "CustomerInquiries");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "CustomerInquiries",
                newName: "Answer");

            migrationBuilder.AddColumn<int>(
                name: "Questioner",
                table: "CustomerInquiries",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Respondent",
                table: "CustomerInquiries",
                type: "int",
                nullable: true);
        }
    }
}

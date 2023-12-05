using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveHopitalColumn_RefundRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoptitalDescription",
                table: "RefundRequests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HoptitalDescription",
                table: "RefundRequests",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

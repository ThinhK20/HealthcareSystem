using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class fixDb5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords");

            migrationBuilder.AddColumn<int>(
                name: "IndexRecord",
                table: "HealthRecords",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("Relational:ColumnOrder", 1);

            migrationBuilder.AddPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords",
                columns: new[] { "UserID", "IndexRecord" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "IndexRecord",
                table: "HealthRecords");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords",
                column: "UserID");
        }
    }
}

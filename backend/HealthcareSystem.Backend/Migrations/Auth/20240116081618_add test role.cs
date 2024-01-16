using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations.Auth
{
    /// <inheritdoc />
    public partial class addtestrole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8c40537d8c41574967302176d24e9588bd74e078b1a858c36a4a5e499f18215b", "8c40537d8c41574967302176d24e9588bd74e078b1a858c36a4a5e499f18215b", "Test", "TEST" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c40537d8c41574967302176d24e9588bd74e078b1a858c36a4a5e499f18215b");
        }
    }
}

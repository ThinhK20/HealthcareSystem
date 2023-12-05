using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class fixdbpayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerRequests_Payments_PaymentId",
                table: "CustomerRequests");

            migrationBuilder.DropIndex(
                name: "IX_CustomerRequests_PaymentId",
                table: "CustomerRequests");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "CustomerRequests");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDate",
                table: "Payments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkCheckOut",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PaypalEmail",
                table: "Payments",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_RequestId",
                table: "Payments",
                column: "RequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_CustomerRequests_RequestId",
                table: "Payments",
                column: "RequestId",
                principalTable: "CustomerRequests",
                principalColumn: "RequestID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_CustomerRequests_RequestId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_RequestId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "ExpirationDate",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "LinkCheckOut",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "PaypalEmail",
                table: "Payments");

            migrationBuilder.AddColumn<int>(
                name: "PaymentId",
                table: "CustomerRequests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequests_PaymentId",
                table: "CustomerRequests",
                column: "PaymentId",
                unique: true,
                filter: "[PaymentId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerRequests_Payments_PaymentId",
                table: "CustomerRequests",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "PaymentId");
        }
    }
}

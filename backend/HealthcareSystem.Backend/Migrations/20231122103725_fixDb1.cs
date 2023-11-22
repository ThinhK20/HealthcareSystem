using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthcareSystem.Backend.Migrations
{
    /// <inheritdoc />
    public partial class fixDb1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords");

            migrationBuilder.DropIndex(
                name: "IX_HealthRecords_UserID",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "DateEnd",
                table: "PackageDetails");

            migrationBuilder.DropColumn(
                name: "DateStart",
                table: "PackageDetails");

            migrationBuilder.DropColumn(
                name: "MaxRefund",
                table: "InsurancePolicy");

            migrationBuilder.DropColumn(
                name: "PayoutPercentage",
                table: "InsurancePolicy");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "HealthRecords");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "MaxRefundPeYear",
                table: "PackageDetails",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "MaxRefundPerDay",
                table: "PackageDetails",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "MaxRefundPerExamination",
                table: "PackageDetails",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PayoutPrice",
                table: "PackageDetails",
                type: "float",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "InsurancePolicy",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "HealthRecords",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("Relational:ColumnOrder", 0);

            migrationBuilder.AlterColumn<int>(
                name: "RecordId",
                table: "HealthRecords",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("Relational:ColumnOrder", 1)
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "HealthRecords",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FeeAffectID",
                table: "HealthRecords",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Phase",
                table: "HealthRecords",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RecordDate",
                table: "HealthRecords",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "CustomerRequests",
                type: "nvarchar(30)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords",
                columns: new[] { "UserID", "RecordId" });

            migrationBuilder.CreateTable(
                name: "BasicPrice",
                columns: table => new
                {
                    PackageID = table.Column<int>(type: "int", nullable: false),
                    IndexId = table.Column<int>(type: "int", nullable: false),
                    FromAge = table.Column<int>(type: "int", nullable: true),
                    ToAge = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasicPrice", x => new { x.PackageID, x.IndexId });
                    table.ForeignKey(
                        name: "FK_BasicPrice_PolicyPackages_PackageID",
                        column: x => x.PackageID,
                        principalTable: "PolicyPackages",
                        principalColumn: "Packageid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FeeAffect",
                columns: table => new
                {
                    FeeAffectId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FeeAffectName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PercentIncreaseInFirst = table.Column<double>(type: "float", nullable: true),
                    PercentIncreaseInNext = table.Column<double>(type: "float", nullable: true),
                    MaxPercentIncrease = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeeAffect", x => x.FeeAffectId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_FeeAffectID",
                table: "HealthRecords",
                column: "FeeAffectID");

            migrationBuilder.AddForeignKey(
                name: "FK_HealthRecords_FeeAffect_FeeAffectID",
                table: "HealthRecords",
                column: "FeeAffectID",
                principalTable: "FeeAffect",
                principalColumn: "FeeAffectId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HealthRecords_FeeAffect_FeeAffectID",
                table: "HealthRecords");

            migrationBuilder.DropTable(
                name: "BasicPrice");

            migrationBuilder.DropTable(
                name: "FeeAffect");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords");

            migrationBuilder.DropIndex(
                name: "IX_HealthRecords_FeeAffectID",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MaxRefundPeYear",
                table: "PackageDetails");

            migrationBuilder.DropColumn(
                name: "MaxRefundPerDay",
                table: "PackageDetails");

            migrationBuilder.DropColumn(
                name: "MaxRefundPerExamination",
                table: "PackageDetails");

            migrationBuilder.DropColumn(
                name: "PayoutPrice",
                table: "PackageDetails");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "FeeAffectID",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "Phase",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "RecordDate",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "CustomerRequests");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateEnd",
                table: "PackageDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateStart",
                table: "PackageDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "InsurancePolicy",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "MaxRefund",
                table: "InsurancePolicy",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PayoutPercentage",
                table: "InsurancePolicy",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<int>(
                name: "RecordId",
                table: "HealthRecords",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("Relational:ColumnOrder", 1)
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "HealthRecords",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("Relational:ColumnOrder", 0);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "HealthRecords",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "HealthRecords",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "HealthRecords",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "HealthRecords",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HealthRecords",
                table: "HealthRecords",
                column: "RecordId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_UserID",
                table: "HealthRecords",
                column: "UserID");
        }
    }
}

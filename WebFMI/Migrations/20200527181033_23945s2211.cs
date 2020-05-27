using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class _23945s2211 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Suma",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<float>(
                name: "SumaD",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SumaE",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SumaR",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SumaD",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SumaE",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SumaR",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "Suma",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

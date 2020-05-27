using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class _23945s221111 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AreSumaD",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "AreSumaE",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "AreSumaR",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AreSumaD",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AreSumaE",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AreSumaR",
                table: "AspNetUsers");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class _23945s22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Reviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Reviews",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Reviews");
        }
    }
}

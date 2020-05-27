using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class _23945s221 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Accepted",
                table: "Transactions",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accepted",
                table: "Transactions");
        }
    }
}

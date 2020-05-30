using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class skd874 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "CategoryTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "CategoryTransactions",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "CategoryTransactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "CategoryTransactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class m9283252 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LimitationCategories_Categories_CategoryId1",
                table: "LimitationCategories");

            migrationBuilder.DropIndex(
                name: "IX_LimitationCategories_CategoryId1",
                table: "LimitationCategories");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "LimitationCategories");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "LimitationCategories",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LimitationCategories_CategoryId",
                table: "LimitationCategories",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_LimitationCategories_Categories_CategoryId",
                table: "LimitationCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LimitationCategories_Categories_CategoryId",
                table: "LimitationCategories");

            migrationBuilder.DropIndex(
                name: "IX_LimitationCategories_CategoryId",
                table: "LimitationCategories");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryId",
                table: "LimitationCategories",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "CategoryId1",
                table: "LimitationCategories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LimitationCategories_CategoryId1",
                table: "LimitationCategories",
                column: "CategoryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_LimitationCategories_Categories_CategoryId1",
                table: "LimitationCategories",
                column: "CategoryId1",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

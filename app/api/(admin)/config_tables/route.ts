import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../utils/prisma-utils";
import { removeUndefined } from "@/app/utils/auth";

export async function GET() {
  try {
    const config_tables = await prisma.config_tables.findMany({
      where: { is_enabled: true },
      orderBy: { id: "asc" },
    });

    return NextResponse.json({
      message: "Successfully fetched config tables",
      response: config_tables,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const config_table = await prisma.config_tables.create({
      data: {
        table_name: body.table_name,
        ui_name: body.ui_name,
        description: body.description,
        is_enabled: true,
      },
    });
    return NextResponse.json({
      message: "Successfully created config table record",
      response: { ...config_table },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    delete body.id;
    const config_table = await prisma.config_tables.update({
      where: { id },
      data: removeUndefined({
        table_name: body.table_name,
        ui_name: body.ui_name,
        description: body.description,
        is_enabled: body.is_enabled,
      }),
    });
    return NextResponse.json({
      message: "Successfully updated config table record",
      response: { ...config_table },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const config_table = await prisma.config_tables.delete({
      where: { id },
    });
    return NextResponse.json({
      message: "Successfully deleted config table record",
      response: { ...config_table },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

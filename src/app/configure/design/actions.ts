"use server";

import {
  CaseColor,
  CaseFinish,
  PhoneModel,
  CaseMaterial,
} from "@prisma/client";
import { db } from "@/db";

export type SaveConfigArgs = {
  color: CaseColor;
  configId: string;
  model: PhoneModel;
  finish: CaseFinish;
  material: CaseMaterial;
};

export async function saveConfig({
  color,
  model,
  finish,
  material,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: {
      color,
      model,
      finish,
      material,
    },
  });
}

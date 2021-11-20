export abstract class BaseMigrater {
  public abstract run(): Promise<void>;
}

export class MigrateManager {
  protected static migraters: Array<BaseMigrater> = [];

  public static register(instance: BaseMigrater) {
    this.migraters.push(instance);
  }

  public static async run(): Promise<void> {
    for (const item of this.migraters) {
      await item.run();
    }
  }
}

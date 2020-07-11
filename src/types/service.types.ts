export interface IService<Model, Input> {
    find(): Promise<Model[]>
    findOne(id: string): Promise<Model>
    create(data: Input): Object
}

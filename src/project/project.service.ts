/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schemas/developer.schema';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Developer.name) private developerModel: Model<Developer>,
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) {}

    async seed(): Promise<{ dev1: Developer; dev2: Developer }> {
        //Create Projects
        const [projectA, projectB] = await Promise.all([
            this.projectModel.create({ title: 'Nest CRM'}),
            this.projectModel.create({ title: 'Mongo Analytics'})
        ]);


        //Create developers with projects
        const [dev1, dev2] = await Promise.all([                      //developers should have projects
            this.developerModel.create({         
                name: 'ABC',
                projects: [projectA._id, projectB._id],
            }),
            this.developerModel.create({
                name: 'XYZ',
                projects: [projectA._id],
            })
        ])

        //PROJECTS DONT KNOW DEVELOPERS YET, SO NEXT WE WILL ASSIGN DEVELOPERS TO PROJECTS
        //Updating Projects
        await Promise.all([           //projects should have developers & after we will have dev1,dev2 then only we can insert into projects

            this.projectModel.findByIdAndUpdate(projectA._id, { // we already created above, now just adding developers object
                $set: { developers: [dev1._id, dev2._id]}
            }),
            this.projectModel.findByIdAndUpdate(projectB._id, {
                $set: { developers: [dev1._id]}
            })
        ]) 
        return { dev1, dev2 };
    }
    async getDevelopers(): Promise<Developer[]>{
        return this.developerModel.find().populate('projects').lean();
    }
    async getProjects(): Promise<Project[]>{
        return this.projectModel.find().populate('developers').lean();
    }
}

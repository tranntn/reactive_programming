import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {map, startWith, tap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from '../services/courses.service';

interface CourseData {
  course: Course;
  lessons: Lesson[]
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {


  }

  ngOnInit() {
    const courseId = +(this.route.snapshot.paramMap.get('courseId'));

    const course$ = this.coursesService.loadCourseById(courseId).pipe(
        startWith(null)
    );

    const lessons$ = this.coursesService.loadAllCourseLessons(courseId).pipe(
        startWith([])
    );

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return {
          course, lessons
        };
      }),
        tap(console.log)
    );
  }


}












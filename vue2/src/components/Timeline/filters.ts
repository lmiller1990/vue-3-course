import moment from 'moment';

import { Post } from '@/types';
import { Period } from './types';

const filterByPeriod = (period: Period, posts: Post[]): Post[] => {
  if (period === 'Today') {
    return posts.filter(
      x => x.created.isSameOrAfter(moment().subtract(1, 'days'))
    )
  }

  if (period === 'This Week') {
    return posts.filter(
      x => x.created.isSameOrAfter(moment().subtract(7, 'days'))
    )
  }

  if (period === 'This Month') {
    return posts.filter(
      x => x.created.isSameOrAfter(moment().subtract(1, 'month'))
    )
  }

  throw Error(`Period ${period} is not valid`)
}

export { filterByPeriod } 

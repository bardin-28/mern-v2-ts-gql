import Router from 'express';
import Link from '../db/models/Link';
const router = Router()


router.get('/:code', async (req, res) =>{
  try{
    const link = await Link.findOne({code: req.params.code })

    if(link){
      link.clicks!++
      await link.save()
      return res.redirect(link.original)
    }

    res.status(404).json('Ссылка не найдена')

  }catch (e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})


module.exports = router
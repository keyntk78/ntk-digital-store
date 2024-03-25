import React from 'react'
import {
  Button,
  ButtonIcon,
  Card,
  CardBody,
  CardHeader
} from '../../../components/admin'
import path from '../../../utils/path'
import icons from '../../../utils/icons'
const { MdDeleteForever, IoSearch } = icons
const PageButtons = () => {
  return (
    <Card>
      <CardHeader title={'Buttons'}></CardHeader>
      <CardBody>
        <div className='flex gap-4'>
          {/* Sizes */}
          <Card isShadow={false}>
            <CardHeader title={'Sizes'} />
            <CardBody>
              <div className='flex flex-wrap items-center gap-2'>
                <Button
                  name={'ExtraSmall'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xs'}
                />
                <Button
                  name={'Small'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xs'}
                />
                <Button
                  name={'Medium'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                />
                <Button
                  name={'Large'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'lg'}
                />
                <Button
                  name={'ExtraLarge'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xl'}
                />
              </div>
            </CardBody>
          </Card>
          {/* Colors */}
          <Card isShadow={false}>
            <CardHeader title={'Colors'} />
            <CardBody>
              <div className='flex gap-2 flex-wrap'>
                <Button
                  name={'Primary'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                />
                <Button
                  name={'Secondary'}
                  onClick={() => {}}
                  color={'secondary'}
                  size={'md'}
                />
                <Button
                  name={'Danger'}
                  onClick={() => {}}
                  color={'danger'}
                  size={'md'}
                />
                <Button
                  name={'Warning'}
                  onClick={() => {}}
                  color={'warning'}
                  size={'md'}
                />
                <Button
                  name={'Success'}
                  onClick={() => {}}
                  color={'success'}
                  size={'md'}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className='flex gap-4 mt-4'>
          {/* Default */}
          <Card isShadow={false}>
            <CardHeader title={'Default'} />
            <CardBody>
              <div className='flex flex-1 items-center flex-wrap gap-2'>
                <Button
                  name={'Primary'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                />

                <Button
                  name={'Link'}
                  link={`/${path.ADMIN}`}
                  color={'primary'}
                  size={'md'}
                />
                <Button
                  name={'Disable'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  disable
                />
              </div>
            </CardBody>
          </Card>
          {/* Icons */}
          <Card isShadow={false}>
            <CardHeader title={'Icons'} />
            <CardBody>
              <div className='flex flex-wrap gap-2'>
                <Button
                  name={'Left Icon'}
                  iconLeft={<MdDeleteForever />}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                />
                <Button
                  name={'Right Icon'}
                  iconRight={<MdDeleteForever />}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-4 mt-4'>
          {/* Outline Sizes */}
          <Card isShadow={false}>
            <CardHeader title={'Outline Sizes'} />
            <CardBody>
              <div className='flex flex-wrap items-center gap-2'>
                <Button
                  name={'ExtraSmall'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xs'}
                  outline
                />
                <Button
                  name={'Small'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xs'}
                  outline
                />
                <Button
                  name={'Medium'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  outline
                />
                <Button
                  name={'Large'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'lg'}
                  outline
                />
                <Button
                  name={'ExtraLarge'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xl'}
                  outline
                />
              </div>
            </CardBody>
          </Card>
          {/* Outline Colors */}
          <Card isShadow={false}>
            <CardHeader title={'Outline Colors'} />
            <CardBody>
              <div className='flex gap-2 flex-wrap'>
                <Button
                  name={'Primary'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  outline
                />
                <Button
                  name={'Secondary'}
                  onClick={() => {}}
                  color={'secondary'}
                  size={'md'}
                  outline
                />
                <Button
                  name={'Danger'}
                  onClick={() => {}}
                  color={'danger'}
                  size={'md'}
                  outline
                />
                <Button
                  name={'Warning'}
                  onClick={() => {}}
                  color={'warning'}
                  size={'md'}
                  outline
                />
                <Button
                  name={'Success'}
                  onClick={() => {}}
                  color={'success'}
                  size={'md'}
                  outline
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-4 mt-4'>
          {/* Outline Default */}
          <Card isShadow={false}>
            <CardHeader title={'Outline Default'} />
            <CardBody>
              <div className='flex-wrap flex flex-1 items-center gap-2'>
                <Button
                  name={'Primary'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  outline
                />

                <Button
                  name={'Link'}
                  link={`/${path.ADMIN}`}
                  color={'primary'}
                  size={'md'}
                  outline
                />
                <Button
                  name={'Disable'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  disable
                  outline
                />
              </div>
            </CardBody>
          </Card>
          {/* Outline Icons */}
          <Card isShadow={false}>
            <CardHeader title={'Outline Icons'} />
            <CardBody>
              <div className='flex gap-2 flex-wrap'>
                <Button
                  name={'Left Icon'}
                  iconLeft={<MdDeleteForever />}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  outline
                />
                <Button
                  name={'Right Icon'}
                  iconRight={<MdDeleteForever />}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  outline
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-4 mt-4'>
          {/* Text Sizes */}
          <Card isShadow={false}>
            <CardHeader title={'Text Sizes'} />
            <CardBody>
              <div className='flex flex-wrap items-center gap-2'>
                <Button
                  name={'ExtraSmall'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xs'}
                  text
                />
                <Button
                  name={'Small'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xs'}
                  text
                />
                <Button
                  name={'Medium'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  text
                />
                <Button
                  name={'Large'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'lg'}
                  text
                />
                <Button
                  name={'ExtraLarge'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'xl'}
                  text
                />
              </div>
            </CardBody>
          </Card>
          {/* Text Colors*/}
          <Card isShadow={false}>
            <CardHeader title={'Text Colors'} />
            <CardBody>
              <div className='flex gap-2 flex-wrap'>
                <Button
                  name={'Primary'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  text
                />
                <Button
                  name={'Secondary'}
                  onClick={() => {}}
                  color={'secondary'}
                  size={'md'}
                  text
                />
                <Button
                  name={'Danger'}
                  onClick={() => {}}
                  color={'danger'}
                  size={'md'}
                  text
                />
                <Button
                  name={'Warning'}
                  onClick={() => {}}
                  color={'warning'}
                  size={'md'}
                  text
                />
                <Button
                  name={'Success'}
                  onClick={() => {}}
                  color={'success'}
                  size={'md'}
                  text
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-4 mt-4'>
          {/* Text Default*/}
          <Card isShadow={false}>
            <CardHeader title={'Text Default'} />
            <CardBody>
              <div className='flex flex-1 flex-wrap items-center gap-2'>
                <Button
                  name={'Primary'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  text
                />

                <Button
                  name={'Link'}
                  link={`/${path.ADMIN}`}
                  color={'primary'}
                  size={'md'}
                  text
                />
                <Button
                  name={'Disable'}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  disable
                  text
                />
              </div>
            </CardBody>
          </Card>
          {/* Text Icons */}
          <Card isShadow={false}>
            <CardHeader title={'Text Icons'} />
            <CardBody>
              <div className='flex gap-2 flex-wrap'>
                <Button
                  name={'Left Icon'}
                  iconLeft={<MdDeleteForever />}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  text
                />
                <Button
                  name={'Right Icon'}
                  iconRight={<MdDeleteForever />}
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  text
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-4 mt-4'>
          {/* ButonIcon Sizes */}
          <Card isShadow={false}>
            <CardHeader title={'ButonIcon Sizes'} />
            <CardBody>
              <div className='flex flex-wrap items-center gap-2'>
                <ButtonIcon
                  onClick={() => {}}
                  color={'primary'}
                  size={'sm'}
                  icon={<IoSearch />}
                  name={'Smaill'}
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Medium'}
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'primary'}
                  size={'lg'}
                  icon={<IoSearch />}
                  name={'Large'}
                />
              </div>
            </CardBody>
          </Card>
          {/* Text Colors */}
          <Card isShadow={false}>
            <CardHeader title={'Text Colors'} />
            <CardBody>
              <div className='flex gap-2 flex-wrap'>
                <ButtonIcon
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Primary'}
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'secondary'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Secondary'}
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'danger'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Danger'}
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'success'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Success'}
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'warning'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Warning'}
                />
              </div>
              <div className='flex mt-4 gap-2 flex-wrap'>
                <ButtonIcon
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Primary'}
                  outline
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'secondary'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Secondary'}
                  outline
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'danger'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Danger'}
                  outline
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'success'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Success'}
                  outline
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'warning'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Warning'}
                  outline
                />
              </div>
              <div className='flex mt-4 gap-2 flex-wrap'>
                <ButtonIcon
                  onClick={() => {}}
                  color={'primary'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Primary'}
                  transparent
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'secondary'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Secondary'}
                  transparent
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'danger'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Danger'}
                  transparent
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'success'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Success'}
                  transparent
                />
                <ButtonIcon
                  onClick={() => {}}
                  color={'warning'}
                  size={'md'}
                  icon={<IoSearch />}
                  name={'Warning'}
                  transparent
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </CardBody>
    </Card>
  )
}

export default PageButtons
